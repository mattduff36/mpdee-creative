import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../../lib/auth';
import { generateInvoicePDF } from '../../../../../../lib/pdf';
import { prisma } from '../../../../../../lib/db';

interface RouteParams {
  params: { id: string };
}

// GET /api/invoices/[id]/pdf - Generate and download invoice PDF
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = params;

    // Fetch invoice with client and items
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

    // Generate PDF
    const pdfBuffer = await generateInvoicePDF({
      invoice,
      company: {
        name: process.env.COMPANY_NAME || 'MPDEE Creative',
        email: process.env.COMPANY_EMAIL || 'matt.mpdee@gmail.com',
        phone: process.env.COMPANY_PHONE,
        address: process.env.COMPANY_ADDRESS,
      },
    });

    // Return PDF as response
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="invoice-${invoice.invoice_number}.html"`,
      },
    });
  } catch (error: any) {
    console.error('Error generating PDF:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }
} 