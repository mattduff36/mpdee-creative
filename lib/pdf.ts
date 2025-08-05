// PDF generation utilities for invoices
import PDFDocument from 'pdfkit';
import { InvoicePDFData } from './types';

export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  const { invoice, company } = data;
  
  return new Promise((resolve, reject) => {
    try {
      // Create a new PDF document
      const doc = new PDFDocument({ 
        size: 'A4',
        margin: 50,
        info: {
          Title: `Invoice ${invoice.invoice_number}`,
          Author: company.name,
          Subject: `Invoice for ${invoice.client.name}`,
        }
      });

      // Create buffer to collect PDF data
      const chunks: Buffer[] = [];
      doc.on('data', (chunk) => chunks.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(chunks)));
      doc.on('error', reject);

      // Brand color
      const brandColor = '#4f46e5';

      // Header Section
      doc.fontSize(24)
         .fillColor(brandColor)
         .text(company.name, 50, 50);

      doc.fontSize(10)
         .fillColor('#333333')
         .text(company.email, 50, 85);

      if (company.phone) {
        doc.text(company.phone, 50, 100);
      }
      if (company.address) {
        doc.text(company.address, 50, 115);
      }

      // Invoice Title and Info (Right side)
      doc.fontSize(32)
         .fillColor(brandColor)
         .text('INVOICE', 400, 50, { align: 'right' });

      doc.fontSize(16)
         .fillColor('#333333')
         .text(`#${invoice.invoice_number}`, 400, 90, { align: 'right' });

      doc.fontSize(10)
         .text(`Date: ${formatDate(invoice.created_at)}`, 400, 115, { align: 'right' });

      if (invoice.due_date) {
        doc.text(`Due: ${formatDate(invoice.due_date)}`, 400, 130, { align: 'right' });
      }

      // Horizontal line
      doc.strokeColor(brandColor)
         .lineWidth(2)
         .moveTo(50, 160)
         .lineTo(545, 160)
         .stroke();

      // Bill To Section
      let yPos = 190;
      doc.fontSize(12)
         .fillColor(brandColor)
         .text('BILL TO:', 50, yPos);

      yPos += 20;
      doc.fontSize(12)
         .fillColor('#333333')
         .font('Helvetica-Bold')
         .text(invoice.client.name, 50, yPos);

      yPos += 15;
      doc.font('Helvetica')
         .text(invoice.client.email, 50, yPos);

      if (invoice.client.phone) {
        yPos += 15;
        doc.text(invoice.client.phone, 50, yPos);
      }

      if (invoice.client.billing_address) {
        yPos += 15;
        const addressLines = invoice.client.billing_address.split('\n');
        addressLines.forEach((line) => {
          doc.text(line, 50, yPos);
          yPos += 15;
        });
      }

      // Items Table
      yPos += 30;
      const tableTop = yPos;

      // Table headers
      doc.fontSize(10)
         .fillColor('white')
         .rect(50, tableTop, 495, 25)
         .fill(brandColor);

      doc.fillColor('white')
         .text('Description', 60, tableTop + 8)
         .text('Qty', 300, tableTop + 8, { width: 50, align: 'right' })
         .text('Rate', 370, tableTop + 8, { width: 80, align: 'right' })
         .text('Amount', 470, tableTop + 8, { width: 80, align: 'right' });

      // Table rows
      yPos = tableTop + 25;
      doc.fillColor('#333333');

      invoice.items.forEach((item, index) => {
        const rowHeight = 25;
        
        // Alternate row colors
        if (index % 2 === 1) {
          doc.rect(50, yPos, 495, rowHeight)
             .fill('#f9fafb');
        }

        doc.fillColor('#333333')
           .text(item.description, 60, yPos + 8, { width: 230 })
           .text(item.quantity.toString(), 300, yPos + 8, { width: 50, align: 'right' })
           .text(formatCurrency(item.rate), 370, yPos + 8, { width: 80, align: 'right' })
           .text(formatCurrency(item.total), 470, yPos + 8, { width: 80, align: 'right' });

        yPos += rowHeight;
      });

      // Total section
      yPos += 20;
      doc.fontSize(14)
         .font('Helvetica-Bold')
         .fillColor(brandColor)
         .text('TOTAL:', 370, yPos, { width: 80, align: 'right' })
         .text(formatCurrency(invoice.total_amount), 470, yPos, { width: 80, align: 'right' });

      // Footer
      yPos += 60;
      doc.fontSize(10)
         .fillColor('#6b7280')
         .font('Helvetica')
         .text('Thank you for your business!', 50, yPos, { align: 'center', width: 495 });

      if (invoice.due_date && invoice.status === 'SENT') {
        yPos += 15;
        doc.text(`Payment is due by ${formatDate(invoice.due_date)}`, 50, yPos, { align: 'center', width: 495 });
      }

      // Finalize the PDF
      doc.end();

    } catch (error) {
      reject(error);
    }
  });
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 