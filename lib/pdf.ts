// PDF generation utilities for invoices
import { pdf } from '@react-pdf/renderer';
import { InvoicePDFData } from './types';

export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  try {
    const { invoice, company } = data;
    
    // Use @react-pdf/renderer programmatic API to avoid JSX in .ts file
    const { Document, Page, Text, View, StyleSheet } = await import('@react-pdf/renderer');
    
    // Create styles
    const styles = StyleSheet.create({
      page: {
        flexDirection: 'column',
        backgroundColor: '#FFFFFF',
        padding: 30,
        fontFamily: 'Helvetica',
        fontSize: 10,
      },
      header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 30,
        paddingBottom: 15,
        borderBottomWidth: 2,
        borderBottomColor: '#4f46e5',
      },
      companyInfo: {
        flex: 1,
      },
      companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#4f46e5',
        marginBottom: 8,
      },
      companyDetails: {
        fontSize: 9,
        color: '#333333',
        lineHeight: 1.3,
      },
      invoiceInfo: {
        textAlign: 'right',
        flex: 1,
      },
      invoiceTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4f46e5',
        marginBottom: 8,
      },
      invoiceNumber: {
        fontSize: 14,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      invoiceDetails: {
        fontSize: 9,
        color: '#333333',
      },
      clientSection: {
        marginBottom: 25,
      },
      sectionTitle: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#4f46e5',
        marginBottom: 8,
        textTransform: 'uppercase',
      },
      clientName: {
        fontSize: 11,
        fontWeight: 'bold',
        marginBottom: 4,
      },
      clientDetails: {
        fontSize: 9,
        color: '#333333',
        lineHeight: 1.3,
      },
      table: {
        display: 'table',
        width: 'auto',
        borderStyle: 'solid',
        borderWidth: 0,
        marginBottom: 20,
      },
      tableRow: {
        margin: 'auto',
        flexDirection: 'row',
      },
      tableHeader: {
        backgroundColor: '#4f46e5',
        color: '#FFFFFF',
        fontWeight: 'bold',
        fontSize: 9,
      },
      tableRowOdd: {
        backgroundColor: '#f9fafb',
      },
      tableColDesc: {
        width: '50%',
        borderStyle: 'solid',
        borderWidth: 0,
        borderRightWidth: 0,
        padding: 8,
      },
      tableColQty: {
        width: '15%',
        borderStyle: 'solid',
        borderWidth: 0,
        borderRightWidth: 0,
        padding: 8,
        textAlign: 'right',
      },
      tableColRate: {
        width: '17.5%',
        borderStyle: 'solid',
        borderWidth: 0,
        borderRightWidth: 0,
        padding: 8,
        textAlign: 'right',
      },
      tableColAmount: {
        width: '17.5%',
        borderStyle: 'solid',
        borderWidth: 0,
        padding: 8,
        textAlign: 'right',
      },
      cellText: {
        fontSize: 9,
      },
      totalSection: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 15,
      },
      totalLabel: {
        fontSize: 12,
        fontWeight: 'bold',
        marginRight: 15,
      },
      totalAmount: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#4f46e5',
        minWidth: 80,
        textAlign: 'right',
      },
      footer: {
        marginTop: 40,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#e5e7eb',
        textAlign: 'center',
        color: '#6b7280',
        fontSize: 8,
      },
    });

    // Create document programmatically
    const MyDocument = Document({
      children: [
        Page({
          size: 'A4',
          style: styles.page,
          children: [
            // Header
            View({
              style: styles.header,
              children: [
                View({
                  style: styles.companyInfo,
                  children: [
                    Text({ style: styles.companyName, children: company.name }),
                    Text({ style: styles.companyDetails, children: company.email }),
                    ...(company.phone ? [Text({ style: styles.companyDetails, children: company.phone })] : []),
                    ...(company.address ? [Text({ style: styles.companyDetails, children: company.address })] : []),
                  ],
                }),
                View({
                  style: styles.invoiceInfo,
                  children: [
                    Text({ style: styles.invoiceTitle, children: 'INVOICE' }),
                    Text({ style: styles.invoiceNumber, children: `#${invoice.invoice_number}` }),
                    Text({ style: styles.invoiceDetails, children: `Date: ${formatDate(invoice.created_at)}` }),
                    ...(invoice.due_date ? [Text({ style: styles.invoiceDetails, children: `Due: ${formatDate(invoice.due_date)}` })] : []),
                  ],
                }),
              ],
            }),
            // Client Information
            View({
              style: styles.clientSection,
              children: [
                Text({ style: styles.sectionTitle, children: 'BILL TO:' }),
                Text({ style: styles.clientName, children: invoice.client.name }),
                Text({ style: styles.clientDetails, children: invoice.client.email }),
                ...(invoice.client.phone ? [Text({ style: styles.clientDetails, children: invoice.client.phone })] : []),
                ...(invoice.client.billing_address ? [Text({ style: styles.clientDetails, children: invoice.client.billing_address })] : []),
              ],
            }),
            // Items Table
            View({
              style: styles.table,
              children: [
                // Table Header
                View({
                  style: [styles.tableRow, styles.tableHeader],
                  children: [
                    View({ style: styles.tableColDesc, children: [Text({ style: styles.cellText, children: 'Description' })] }),
                    View({ style: styles.tableColQty, children: [Text({ style: styles.cellText, children: 'Qty' })] }),
                    View({ style: styles.tableColRate, children: [Text({ style: styles.cellText, children: 'Rate' })] }),
                    View({ style: styles.tableColAmount, children: [Text({ style: styles.cellText, children: 'Amount' })] }),
                  ],
                }),
                // Table Rows
                ...invoice.items.map((item, index) =>
                  View({
                    key: index,
                    style: [styles.tableRow, ...(index % 2 === 1 ? [styles.tableRowOdd] : [])],
                    children: [
                      View({ style: styles.tableColDesc, children: [Text({ style: styles.cellText, children: item.description })] }),
                      View({ style: styles.tableColQty, children: [Text({ style: styles.cellText, children: item.quantity.toString() })] }),
                      View({ style: styles.tableColRate, children: [Text({ style: styles.cellText, children: formatCurrency(item.rate) })] }),
                      View({ style: styles.tableColAmount, children: [Text({ style: styles.cellText, children: formatCurrency(item.total) })] }),
                    ],
                  })
                ),
              ],
            }),
            // Total
            View({
              style: styles.totalSection,
              children: [
                Text({ style: styles.totalLabel, children: 'TOTAL:' }),
                Text({ style: styles.totalAmount, children: formatCurrency(invoice.total_amount) }),
              ],
            }),
            // Footer
            View({
              style: styles.footer,
              children: [
                Text({ children: 'Thank you for your business!' }),
                ...(invoice.due_date && invoice.status === 'SENT' ? [Text({ children: `Payment is due by ${formatDate(invoice.due_date)}` })] : []),
              ],
            }),
          ],
        }),
      ],
    });

    const blob = await pdf(MyDocument).toBuffer();
    return blob;
  } catch (error) {
    console.error('Error generating PDF:', error);
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