import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../../../lib/auth';
import { prisma } from '../../../../../../../lib/db';

interface IgnoreBody { transaction_ids: string[] }

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;
    const { transaction_ids } = (await request.json()) as IgnoreBody;
    if (!Array.isArray(transaction_ids) || transaction_ids.length === 0) {
      return NextResponse.json({ success: false, error: 'No transactions provided' }, { status: 400 });
    }

    await prisma.bankTransaction.updateMany({
      where: { import_id: id, id: { in: transaction_ids } },
      data: { status: 'IGNORED' },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Ignore transactions failed', error);
    return NextResponse.json({ success: false, error: 'Failed to ignore transactions' }, { status: 500 });
  }
}


