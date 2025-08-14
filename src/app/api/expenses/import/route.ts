import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '../../../../../lib/auth';
import { prisma } from '../../../../../lib/db';
import { parse } from 'csv-parse/sync';

interface ParsedRow {
  date?: string;
  description?: string;
  amount?: string;
  [key: string]: unknown;
}

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  try {
    await requireAuth();
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const csvContent = Buffer.from(arrayBuffer).toString('utf-8');

    const records = parse(csvContent, {
      columns: (header: string[]) => header.map((h) => h.trim().toLowerCase()),
      skip_empty_lines: true,
      relax_column_count: true,
      trim: true,
    }) as ParsedRow[];

    const importRecord = await prisma.bankStatementImport.create({
      data: { filename: file.name },
    });

    const toCreate: {
      import_id: string;
      date: Date;
      description: string;
      amount: number;
      raw?: any;
    }[] = [];

    function parseDate(input?: string) {
      if (!input) return null;
      const s = input.trim();
      // dd/mm/yyyy
      const m = s.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
      if (m) {
        const dd = Number(m[1]);
        const mm = Number(m[2]);
        const yyyy = Number(m[3]);
        const d = new Date(yyyy, mm - 1, dd);
        if (!Number.isNaN(d.getTime())) return d;
      }
      const fallback = new Date(s);
      return Number.isNaN(fallback.getTime()) ? null : fallback;
    }

    for (const row of records) {
      // Accept common headers: Date/Description/Amount (case-insensitive)
      const date = parseDate((row.date ?? (row as any)['transaction date']) as string | undefined);
      if (!date) continue;
      const amountStr = (row.amount ?? (row as any)['debit'] ?? (row as any)['credit']) as string | undefined;
      if (!amountStr) continue;
      const normalizedAmount = String(amountStr).replace(/[,£]/g, '').trim();
      const amount = parseFloat(normalizedAmount);
      if (!Number.isFinite(amount)) continue;
      const description = (row.description as string | undefined)?.toString() || (row as any)['narrative'] || '';

      toCreate.push({
        import_id: importRecord.id,
        date,
        description,
        amount,
        raw: row as unknown as any,
      });
    }

    if (toCreate.length > 0) {
      await prisma.bankTransaction.createMany({ data: toCreate });
    }

    return NextResponse.json({ success: true, data: { import_id: importRecord.id, created: toCreate.length } });
  } catch (error) {
    console.error('CSV import failed', error);
    return NextResponse.json({ success: false, error: 'Failed to import CSV' }, { status: 500 });
  }
}


