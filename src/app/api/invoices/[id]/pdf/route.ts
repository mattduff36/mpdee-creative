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

    // Add user-controlled print button
    const htmlWithPrintButton = htmlContent.replace(
      '</head>',
      `
        <style>
          .print-controls {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1000;
            background: white;
            padding: 15px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            border: 1px solid #e5e7eb;
          }
          .print-btn {
            background: #4f46e5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 6px;
            font-weight: 600;
            cursor: pointer;
            margin-right: 10px;
          }
          .print-btn:hover {
            background: #3730a3;
          }
          .close-btn {
            background: #6b7280;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 6px;
            cursor: pointer;
          }
          .close-btn:hover {
            background: #4b5563;
          }
          @media print {
            .print-controls { display: none; }
          }
        </style>
        <script>
          function printInvoice() {
            window.print();
          }
          function closeWindow() {
            window.close();
          }
        </script>
      </head>`
    ).replace(
      '<body>',
      `<body>
        <div class="print-controls">
          <button class="print-btn" onclick="printInvoice()">📄 Save as PDF</button>
          <button class="close-btn" onclick="closeWindow()">✕ Close</button>
        </div>`
    );

    // Return clean HTML with print controls
    return new NextResponse(htmlWithPrintButton, {
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