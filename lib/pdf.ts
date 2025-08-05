// PDF generation utilities for invoices
import { InvoicePDFData } from './types';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';

// Define styles for the PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4f46e5',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 10,
  },
  invoiceInfo: {
    flex: 1,
    alignItems: 'flex-end',
  },
  invoiceTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 10,
  },
  invoiceNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  clientInfo: {
    marginTop: 30,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  clientName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  table: {
    marginTop: 20,
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: 10,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    padding: 10,
  },
  tableCol: {
    flex: 1,
  },
  tableColRight: {
    flex: 1,
    textAlign: 'right',
  },
  totalSection: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 10,
  },
  totalLabel: {
    width: 100,
    fontWeight: 'bold',
    textAlign: 'right',
    marginRight: 20,
  },
  totalAmount: {
    width: 100,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4f46e5',
    textAlign: 'right',
  },
  footer: {
    marginTop: 50,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'center',
    color: '#6b7280',
    fontSize: 10,
  },
});

export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  const { invoice, company } = data;

  // Create PDF document using @react-pdf/renderer
  const MyDocument = (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{company.name}</Text>
            <Text>{company.email}</Text>
            {company.phone && <Text>{company.phone}</Text>}
            {company.address && <Text>{company.address}</Text>}
          </View>
          <View style={styles.invoiceInfo}>
            <Text style={styles.invoiceTitle}>INVOICE</Text>
            <Text style={styles.invoiceNumber}>#{invoice.invoice_number}</Text>
            <Text>Date: {formatDate(invoice.created_at)}</Text>
            {invoice.due_date && <Text>Due: {formatDate(invoice.due_date)}</Text>}
          </View>
        </View>

        {/* Client Info */}
        <View style={styles.clientInfo}>
          <Text style={styles.sectionTitle}>Bill To:</Text>
          <Text style={styles.clientName}>{invoice.client.name}</Text>
          <Text>{invoice.client.email}</Text>
          {invoice.client.phone && <Text>{invoice.client.phone}</Text>}
          {invoice.client.billing_address && (
            <Text style={{ marginTop: 10 }}>{invoice.client.billing_address}</Text>
          )}
        </View>

        {/* Items Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCol}>Description</Text>
            <Text style={styles.tableColRight}>Quantity</Text>
            <Text style={styles.tableColRight}>Rate</Text>
            <Text style={styles.tableColRight}>Amount</Text>
          </View>
          {invoice.items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCol}>{item.description}</Text>
              <Text style={styles.tableColRight}>{item.quantity}</Text>
              <Text style={styles.tableColRight}>{formatCurrency(item.rate)}</Text>
              <Text style={styles.tableColRight}>{formatCurrency(item.total)}</Text>
            </View>
          ))}
        </View>

        {/* Total */}
        <View style={styles.totalSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL:</Text>
            <Text style={styles.totalAmount}>{formatCurrency(invoice.total_amount)}</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
          {invoice.due_date && invoice.status === 'SENT' && (
            <Text>Payment is due by {formatDate(invoice.due_date)}</Text>
          )}
        </View>
      </Page>
    </Document>
  );

  // Generate PDF and return as Buffer
  const pdfBuffer = await pdf(MyDocument).toBuffer();
  return pdfBuffer;
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