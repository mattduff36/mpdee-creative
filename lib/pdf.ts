// PDF generation utilities for invoices
import { InvoicePDFData } from './types';

export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  const { invoice, company } = data;
  
  // Create HTML template for the invoice
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Invoice ${invoice.invoice_number}</title>
        <style>
            body {
                font-family: 'Helvetica', Arial, sans-serif;
                font-size: 12px;
                line-height: 1.4;
                color: #333;
                margin: 0;
                padding: 20px;
            }
            .header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 40px;
                border-bottom: 2px solid #4f46e5;
                padding-bottom: 20px;
            }
            .company-info {
                flex: 1;
            }
            .company-name {
                font-size: 24px;
                font-weight: bold;
                color: #4f46e5;
                margin-bottom: 10px;
            }
            .invoice-info {
                text-align: right;
                flex: 1;
            }
            .invoice-title {
                font-size: 32px;
                font-weight: bold;
                color: #4f46e5;
                margin-bottom: 10px;
            }
            .invoice-number {
                font-size: 18px;
                margin-bottom: 5px;
            }
            .client-info {
                margin: 40px 0;
            }
            .section-title {
                font-size: 14px;
                font-weight: bold;
                color: #4f46e5;
                margin-bottom: 10px;
                text-transform: uppercase;
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin: 30px 0;
            }
            .items-table th {
                background-color: #4f46e5;
                color: white;
                padding: 12px;
                text-align: left;
                font-weight: bold;
            }
            .items-table td {
                padding: 12px;
                border-bottom: 1px solid #e5e7eb;
            }
            .items-table tr:nth-child(even) {
                background-color: #f9fafb;
            }
            .text-right {
                text-align: right;
            }
            .total-section {
                margin-top: 30px;
                text-align: right;
            }
            .total-row {
                display: flex;
                justify-content: flex-end;
                margin-bottom: 10px;
            }
            .total-label {
                width: 150px;
                text-align: right;
                padding-right: 20px;
                font-weight: bold;
            }
            .total-amount {
                width: 100px;
                text-align: right;
                font-size: 18px;
                font-weight: bold;
                color: #4f46e5;
            }
            .footer {
                margin-top: 50px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 10px;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <div class="company-info">
                <div class="company-name">${company.name}</div>
                <div>${company.email}</div>
                ${company.phone ? `<div>${company.phone}</div>` : ''}
                ${company.address ? `<div>${company.address}</div>` : ''}
            </div>
            <div class="invoice-info">
                <div class="invoice-title">INVOICE</div>
                <div class="invoice-number">#${invoice.invoice_number}</div>
                <div>Date: ${formatDate(invoice.created_at)}</div>
                ${invoice.due_date ? `<div>Due: ${formatDate(invoice.due_date)}</div>` : ''}
            </div>
        </div>

        <div class="client-info">
            <div class="section-title">Bill To:</div>
            <div style="font-weight: bold; font-size: 14px; margin-bottom: 5px;">${invoice.client.name}</div>
            <div>${invoice.client.email}</div>
            ${invoice.client.phone ? `<div>${invoice.client.phone}</div>` : ''}
            ${invoice.client.billing_address ? `<div style="margin-top: 10px; white-space: pre-line;">${invoice.client.billing_address}</div>` : ''}
        </div>

        <table class="items-table">
            <thead>
                <tr>
                    <th>Description</th>
                    <th class="text-right">Quantity</th>
                    <th class="text-right">Rate</th>
                    <th class="text-right">Amount</th>
                </tr>
            </thead>
            <tbody>
                ${invoice.items.map(item => `
                    <tr>
                        <td>${item.description}</td>
                        <td class="text-right">${item.quantity}</td>
                        <td class="text-right">${formatCurrency(item.rate)}</td>
                        <td class="text-right">${formatCurrency(item.total)}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>

        <div class="total-section">
            <div class="total-row">
                <div class="total-label">TOTAL:</div>
                <div class="total-amount">${formatCurrency(invoice.total_amount)}</div>
            </div>
        </div>

        <div class="footer">
            <p>Thank you for your business!</p>
            ${invoice.due_date && invoice.status === 'SENT' ? 
              `<p>Payment is due by ${formatDate(invoice.due_date)}</p>` : ''}
        </div>
    </body>
    </html>
  `;

  // For now, we'll return the HTML as a buffer
  // In a production environment, you would use a library like puppeteer or playwright
  // to convert HTML to PDF, but for simplicity, we'll return HTML
  return Buffer.from(html, 'utf-8');
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP'
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
} 