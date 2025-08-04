'use client';

import { useRouter } from 'next/navigation';
import Navigation from '../../../../components/accounts/Navigation';
import ClientForm from '../../../../components/accounts/ClientForm';

export default function NewClientPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/accounts/clients');
  };

  const handleCancel = () => {
    router.push('/accounts/clients');
  };

  return (
    <>
      <Navigation />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ClientForm
            onSuccess={handleSuccess}
            onCancel={handleCancel}
          />
        </div>
      </div>
    </>
  );
} 