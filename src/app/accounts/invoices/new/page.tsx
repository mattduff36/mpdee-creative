'use client';

import { useRouter } from 'next/navigation';
import Navigation from '../../../../components/accounts/Navigation';
import InvoiceForm from '../../../../components/accounts/InvoiceForm';

export default function NewInvoicePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/accounts/invoices');
  };

  const handleCancel = () => {
    router.push('/accounts/invoices');
  };

  return (
    <>
      <Navigation />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <InvoiceForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
} 