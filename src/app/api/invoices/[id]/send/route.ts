import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../../lib/auth';
import { sendInvoiceEmail } from '../../../../../../lib/email';
import { ApiResponse } from '../../../../../../lib/types';

interface RouteParams {
  params: { id: string };
}

// POST /api/invoices/[id]/send - Send invoice via email
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    // Check authentication
    await requireAuth();

    const { id } = params;

    // Send the invoice email
    const emailSent = await sendInvoiceEmail(id);

    if (emailSent) {
      const response: ApiResponse = {
        success: true,
      };
      return NextResponse.json(response);
    } else {
      return NextResponse.json(
        { success: false, error: 'Failed to send invoice email' },
        { status: 500 }
      );
    }
  } catch (error: any) {
    console.error('Error sending invoice:', error);
    
    if (error.message === 'Authentication required') {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || 'Failed to send invoice' },
      { status: 500 }
    );
  }
} 