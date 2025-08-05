// PDF generation utilities for invoices
import React from 'react';
import { Document, Page, Text, View, StyleSheet, pdf } from '@react-pdf/renderer';
import { InvoicePDFData } from './types';

export async function generateInvoicePDF(data: InvoicePDFData): Promise<Buffer> {
  try {
  const { invoice, company } = data;
  
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

    // Create PDF document using JSX
    const MyDocument = (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{company.name}</Text>
              <Text style={styles.companyDetails}>{company.email}</Text>
              {company.phone && <Text style={styles.companyDetails}>{company.phone}</Text>}
              {company.address && <Text style={styles.companyDetails}>{company.address}</Text>}
            </View>
            <View style={styles.invoiceInfo}>
              <Text style={styles.invoiceTitle}>INVOICE</Text>
              <Text style={styles.invoiceNumber}>#{invoice.invoice_number}</Text>
              <Text style={styles.invoiceDetails}>Date: {formatDate(invoice.created_at)}</Text>
              {invoice.due_date && (
                <Text style={styles.invoiceDetails}>Due: {formatDate(invoice.due_date)}</Text>
              )}
            </View>
          </View>

          {/* Client Information */}
          <View style={styles.clientSection}>
            <Text style={styles.sectionTitle}>BILL TO:</Text>
            <Text style={styles.clientName}>{invoice.client.name}</Text>
            <Text style={styles.clientDetails}>{invoice.client.email}</Text>
            {invoice.client.phone && (
              <Text style={styles.clientDetails}>{invoice.client.phone}</Text>
            )}
            {invoice.client.billing_address && (
              <Text style={styles.clientDetails}>{invoice.client.billing_address}</Text>
            )}
          </View>

          {/* Items Table */}
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <View style={styles.tableColDesc}>
                <Text style={styles.cellText}>Description</Text>
              </View>
              <View style={styles.tableColQty}>
                <Text style={styles.cellText}>Qty</Text>
              </View>
              <View style={styles.tableColRate}>
                <Text style={styles.cellText}>Rate</Text>
              </View>
              <View style={styles.tableColAmount}>
                <Text style={styles.cellText}>Amount</Text>
              </View>
            </View>

            {/* Table Rows */}
            {invoice.items.map((item, index) => (
              <View 
                key={index} 
                style={[styles.tableRow, index % 2 === 1 ? styles.tableRowOdd : null]}
              >
                <View style={styles.tableColDesc}>
                  <Text style={styles.cellText}>{item.description}</Text>
                </View>
                <View style={styles.tableColQty}>
                  <Text style={styles.cellText}>{item.quantity}</Text>
                </View>
                <View style={styles.tableColRate}>
                  <Text style={styles.cellText}>{formatCurrency(item.rate)}</Text>
                </View>
                <View style={styles.tableColAmount}>
                  <Text style={styles.cellText}>{formatCurrency(item.total)}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Total */}
          <View style={styles.totalSection}>
            <Text style={styles.totalLabel}>TOTAL:</Text>
            <Text style={styles.totalAmount}>{formatCurrency(invoice.total_amount)}</Text>
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