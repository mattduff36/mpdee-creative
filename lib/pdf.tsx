// PDF generation utilities for invoices using jsPDF
import { jsPDF } from 'jspdf';
import { InvoicePDFData } from './types';

export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  try {
    const { invoice, company } = data;

    // Create new PDF document
    const doc = new jsPDF();
    
    // Brand color (convert hex to RGB)
    const brandColor = [79, 70, 229] as const; // #4f46e5
    const blackColor = [0, 0, 0] as const;
    const grayColor = [107, 114, 128] as const; // #6b7280

    let yPos = 20;

    // Header - Company name
    doc.setFontSize(18);
    doc.setTextColor(...brandColor);
    doc.text(company.name, 20, yPos);
    yPos += 10;

    // Company details
    doc.setFontSize(10);
    doc.setTextColor(...blackColor);
    doc.text(company.email, 20, yPos);
    yPos += 5;
    
    if (company.phone) {
      doc.text(company.phone, 20, yPos);
      yPos += 5;
    }
    
    if (company.address) {
      const addressLines = company.address.split('\n');
      addressLines.forEach((line) => {
        doc.text(line, 20, yPos);
        yPos += 5;
      });
    }

    // Invoice title and number (right side)
    doc.setFontSize(24);
    doc.setTextColor(...brandColor);
    doc.text('INVOICE', 150, 20, { align: 'right' });
    
    doc.setFontSize(14);
    doc.setTextColor(...blackColor);
    doc.text(`#${invoice.invoice_number}`, 150, 35, { align: 'right' });
    
    doc.setFontSize(10);
    doc.text(`Date: ${formatDate(invoice.created_at)}`, 150, 45, { align: 'right' });
    
    if (invoice.due_date) {
      doc.text(`Due: ${formatDate(invoice.due_date)}`, 150, 52, { align: 'right' });
    }

    // Horizontal line
    yPos = 65;
    doc.setDrawColor(...brandColor);
    doc.setLineWidth(1);
    doc.line(20, yPos, 190, yPos);
    yPos += 15;

    // Bill To section
    doc.setFontSize(12);
    doc.setTextColor(...brandColor);
    doc.text('BILL TO:', 20, yPos);
    yPos += 8;

    doc.setFontSize(11);
    doc.setTextColor(...blackColor);
    doc.text(invoice.client.name, 20, yPos);
    yPos += 6;

    doc.setFontSize(9);
    doc.text(invoice.client.email, 20, yPos);
    yPos += 5;

    if (invoice.client.phone) {
      doc.text(invoice.client.phone, 20, yPos);
      yPos += 5;
    }

    if (invoice.client.billing_address) {
      const clientAddressLines = invoice.client.billing_address.split('\n');
      clientAddressLines.forEach((line) => {
        doc.text(line, 20, yPos);
        yPos += 5;
      });
    }

    yPos += 10;

    // Items table header
    doc.setFillColor(...brandColor);
    doc.rect(20, yPos, 170, 8, 'F');
    
    doc.setFontSize(9);
    doc.setTextColor(255, 255, 255);
    doc.text('Description', 22, yPos + 5);
    doc.text('Qty', 120, yPos + 5, { align: 'right' });
    doc.text('Rate', 140, yPos + 5, { align: 'right' });
    doc.text('Amount', 185, yPos + 5, { align: 'right' });
    yPos += 8;

    // Items table rows
    doc.setTextColor(...blackColor);
    invoice.items.forEach((item, index) => {
      if (index % 2 === 1) {
        doc.setFillColor(249, 250, 251); // Light gray for alternating rows
        doc.rect(20, yPos, 170, 6, 'F');
      }
      
      doc.text(item.description, 22, yPos + 4);
      doc.text(item.quantity.toString(), 120, yPos + 4, { align: 'right' });
      doc.text(formatCurrency(item.rate), 140, yPos + 4, { align: 'right' });
      doc.text(formatCurrency(item.total), 185, yPos + 4, { align: 'right' });
      yPos += 6;
    });

    yPos += 10;

    // Total
    doc.setFontSize(12);
    doc.setTextColor(...brandColor);
    doc.text('TOTAL:', 140, yPos, { align: 'right' });
    doc.setFontSize(14);
    doc.text(formatCurrency(invoice.total_amount), 185, yPos, { align: 'right' });

    yPos += 20;

    // Footer
    doc.setFontSize(10);
    doc.setTextColor(...grayColor);
    doc.text('Thank you for your business!', 105, yPos, { align: 'center' });
    
    if (invoice.due_date && invoice.status === 'SENT') {
      yPos += 6;
      doc.text(`Payment is due by ${formatDate(invoice.due_date)}`, 105, yPos, { align: 'center' });
    }

    // Convert to buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));
    
    return pdfBuffer;
  } catch (error) {
    console.error('Error in generateInvoicePDF:', error);
    throw error;
  }
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