import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../../lib/auth';
import { generateInvoicePDF } from '../../../../../../lib/pdf';
import { prisma } from '../../../../../../lib/db';

// GET /api/invoices/[id]/pdf - Generate and download invoice PDF
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = await params;

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

    // Generate HTML for PDF
    const htmlContent = await generateInvoicePDF({
      invoice,
      company: {
        name: process.env.COMPANY_NAME || 'MPDEE Creative',
        email: process.env.COMPANY_EMAIL || 'matt.mpdee@gmail.com',
        phone: process.env.COMPANY_PHONE,
        address: process.env.COMPANY_ADDRESS,
      },
    });

    // Add auto-print script for PDF conversion
    const htmlWithScript = htmlContent.replace(
      '</head>',
      `
        <script>
          window.onload = function() {
            // Auto-trigger print dialog for PDF saving
            setTimeout(() => {
              window.print();
            }, 500);
          };
        </script>
      </head>`
    );

    // Return HTML that will auto-trigger PDF print dialog
    return new NextResponse(htmlWithScript, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache',
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