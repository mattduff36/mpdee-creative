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

    // Create document using React.createElement
    const MyDocument = React.createElement(Document, {}, [
      React.createElement(Page, { 
        size: 'A4',
        style: styles.page,
        key: 'page1'
      }, [
        // Header
        React.createElement(View, {
          style: styles.header,
          key: 'header'
        }, [
          React.createElement(View, {
            style: styles.companyInfo,
            key: 'company-info'
          }, [
            React.createElement(Text, { style: styles.companyName, key: 'company-name' }, company.name),
            React.createElement(Text, { style: styles.companyDetails, key: 'company-email' }, company.email),
            ...(company.phone ? [React.createElement(Text, { style: styles.companyDetails, key: 'company-phone' }, company.phone)] : []),
            ...(company.address ? [React.createElement(Text, { style: styles.companyDetails, key: 'company-address' }, company.address)] : []),
          ]),
          React.createElement(View, {
            style: styles.invoiceInfo,
            key: 'invoice-info'
          }, [
            React.createElement(Text, { style: styles.invoiceTitle, key: 'invoice-title' }, 'INVOICE'),
            React.createElement(Text, { style: styles.invoiceNumber, key: 'invoice-number' }, `#${invoice.invoice_number}`),
            React.createElement(Text, { style: styles.invoiceDetails, key: 'invoice-date' }, `Date: ${formatDate(invoice.created_at)}`),
            ...(invoice.due_date ? [React.createElement(Text, { style: styles.invoiceDetails, key: 'invoice-due' }, `Due: ${formatDate(invoice.due_date)}`)] : []),
          ]),
        ]),
        // Client Information
        React.createElement(View, {
          style: styles.clientSection,
          key: 'client-section'
        }, [
          React.createElement(Text, { style: styles.sectionTitle, key: 'bill-to-title' }, 'BILL TO:'),
          React.createElement(Text, { style: styles.clientName, key: 'client-name' }, invoice.client.name),
          React.createElement(Text, { style: styles.clientDetails, key: 'client-email' }, invoice.client.email),
          ...(invoice.client.phone ? [React.createElement(Text, { style: styles.clientDetails, key: 'client-phone' }, invoice.client.phone)] : []),
          ...(invoice.client.billing_address ? [React.createElement(Text, { style: styles.clientDetails, key: 'client-address' }, invoice.client.billing_address)] : []),
        ]),
        // Items Table
        React.createElement(View, {
          style: styles.table,
          key: 'items-table'
        }, [
          // Table Header
          React.createElement(View, {
            style: [styles.tableRow, styles.tableHeader],
            key: 'table-header'
          }, [
            React.createElement(View, { style: styles.tableColDesc, key: 'header-desc' }, [
              React.createElement(Text, { style: styles.cellText, key: 'desc-text' }, 'Description')
            ]),
            React.createElement(View, { style: styles.tableColQty, key: 'header-qty' }, [
              React.createElement(Text, { style: styles.cellText, key: 'qty-text' }, 'Qty')
            ]),
            React.createElement(View, { style: styles.tableColRate, key: 'header-rate' }, [
              React.createElement(Text, { style: styles.cellText, key: 'rate-text' }, 'Rate')
            ]),
            React.createElement(View, { style: styles.tableColAmount, key: 'header-amount' }, [
              React.createElement(Text, { style: styles.cellText, key: 'amount-text' }, 'Amount')
            ]),
          ]),
          // Table Rows
          ...invoice.items.map((item, index) =>
            React.createElement(View, {
              key: `row-${index}`,
              style: [styles.tableRow, ...(index % 2 === 1 ? [styles.tableRowOdd] : [])]
            }, [
              React.createElement(View, { style: styles.tableColDesc, key: `desc-${index}` }, [
                React.createElement(Text, { style: styles.cellText, key: `desc-text-${index}` }, item.description)
              ]),
              React.createElement(View, { style: styles.tableColQty, key: `qty-${index}` }, [
                React.createElement(Text, { style: styles.cellText, key: `qty-text-${index}` }, item.quantity.toString())
              ]),
              React.createElement(View, { style: styles.tableColRate, key: `rate-${index}` }, [
                React.createElement(Text, { style: styles.cellText, key: `rate-text-${index}` }, formatCurrency(item.rate))
              ]),
              React.createElement(View, { style: styles.tableColAmount, key: `amount-${index}` }, [
                React.createElement(Text, { style: styles.cellText, key: `amount-text-${index}` }, formatCurrency(item.total))
              ]),
            ])
          ),
        ]),
        // Total
        React.createElement(View, {
          style: styles.totalSection,
          key: 'total-section'
        }, [
          React.createElement(Text, { style: styles.totalLabel, key: 'total-label' }, 'TOTAL:'),
          React.createElement(Text, { style: styles.totalAmount, key: 'total-amount' }, formatCurrency(invoice.total_amount)),
        ]),
        // Footer
        React.createElement(View, {
          style: styles.footer,
          key: 'footer'
        }, [
          React.createElement(Text, { key: 'footer-thanks' }, 'Thank you for your business!'),
          ...(invoice.due_date && invoice.status === 'SENT' ? [React.createElement(Text, { key: 'footer-due' }, `Payment is due by ${formatDate(invoice.due_date)}`)] : []),
        ]),
      ])
    ]);

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