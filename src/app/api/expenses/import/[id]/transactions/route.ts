import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../../../lib/auth';
import { prisma } from '../../../../../../../lib/db';

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    await requireAuth();
    const { id } = await params;

    const importRecord = await prisma.bankStatementImport.findUnique({
      where: { id },
    });
    if (!importRecord) {
      return NextResponse.json({ success: false, error: 'Import not found' }, { status: 404 });
    }

    const transactions = await prisma.bankTransaction.findMany({
      where: { import_id: id },
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ success: true, data: transactions });
  } catch (error) {
    console.error('Fetch import transactions failed', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch transactions' }, { status: 500 });
  }
}


