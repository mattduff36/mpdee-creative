import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/db';
import { requireAuth } from '../../../../../lib/auth';
import { InvoiceFormData, ApiResponse, InvoiceWithDetails, InvoiceStatus } from '../../../../../lib/types';

// GET /api/invoices/[id] - Get a specific invoice with details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await params;

    const invoice = await prisma.invoice.findUnique({
      where: { id },
      include: {
        client: true,
        items: true,
      },
    });

    if (!invoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse<InvoiceWithDetails> = {
      success: true,
      data: invoice,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching invoice:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to fetch invoice' },
      { status: 500 }
    );
  }
}

// PUT /api/invoices/[id] - Update a specific invoice
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await params;
    const body = await request.json();
    const { client_id, due_date, items }: InvoiceFormData = body;

    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!existingInvoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Check if invoice can be edited (only draft invoices)
    if (existingInvoice.status !== InvoiceStatus.DRAFT) {
      return NextResponse.json(
        { success: false, error: 'Only draft invoices can be edited' },
        { status: 409 }
      );
    }

    // Validate required fields
    if (!client_id || !items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Client and at least one item are required' },
        { status: 400 }
      );
    }

    // Validate client exists
    const client = await prisma.client.findUnique({
      where: { id: client_id },
    });

    if (!client) {
      return NextResponse.json(
        { success: false, error: 'Client not found' },
        { status: 404 }
      );
    }

    // Validate items
    for (const item of items) {
      if (!item.description || item.quantity <= 0 || item.rate <= 0) {
        return NextResponse.json(
          { success: false, error: 'All items must have description, quantity > 0, and rate > 0' },
          { status: 400 }
        );
      }
    }

    // Calculate total amount accounting for agency commission
    const total_amount = items.reduce((sum, item) => {
      const baseTotal = item.quantity * item.rate;
      const commissionAmount = (baseTotal * (item.agency_commission || 0)) / 100;
      return sum + (baseTotal - commissionAmount);
    }, 0);

    // Update the invoice with items in a transaction
    const updatedInvoice = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.invoiceItem.deleteMany({
        where: { invoice_id: id },
      });

      // Update the invoice
      const invoice = await tx.invoice.update({
        where: { id },
        data: {
          client_id,
          total_amount,
          due_date: due_date ? new Date(due_date) : null,
        },
      });

      // Create new invoice items
      const invoiceItems = await Promise.all(
        items.map((item) => {
          const baseTotal = item.quantity * item.rate;
          const commissionAmount = (baseTotal * (item.agency_commission || 0)) / 100;
          const total = baseTotal - commissionAmount;
          
          return tx.invoiceItem.create({
            data: {
              invoice_id: id,
              description: item.description,
              quantity: item.quantity,
              rate: item.rate,
              total,
              agency_commission: item.agency_commission || 0,
            },
          });
        })
      );

      return { ...invoice, items: invoiceItems };
    });

    // Fetch the client data for the response
    const clientData = await prisma.client.findUnique({
      where: { id: client_id },
    });

    const response: ApiResponse<typeof updatedInvoice & { client: typeof clientData }> = {
      success: true,
      data: { ...updatedInvoice, client: clientData },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error updating invoice:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update invoice' },
      { status: 500 }
    );
  }
}

// DELETE /api/invoices/[id] - Delete a specific invoice
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await params;

    // Check if invoice exists
    const existingInvoice = await prisma.invoice.findUnique({
      where: { id },
    });

    if (!existingInvoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice not found' },
        { status: 404 }
      );
    }

    // Check if invoice can be deleted (only draft invoices)
    if (existingInvoice.status !== InvoiceStatus.DRAFT) {
      return NextResponse.json(
        { success: false, error: 'Only draft invoices can be deleted' },
        { status: 409 }
      );
    }

    // Delete the invoice (items will be deleted due to cascade)
    await prisma.invoice.delete({
      where: { id },
    });

    const response: ApiResponse = {
      success: true,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error deleting invoice:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to delete invoice' },
      { status: 500 }
    );
  }
} 