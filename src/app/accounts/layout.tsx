import { ReactNode } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Accounting System | MPDEE Creative',
  description: 'MPDEE Creative accounting and invoice management system',
  robots: {
    index: false,
    follow: false,
  },
};

interface AccountsLayoutProps {
  children: ReactNode;
}

export default function AccountsLayout({ children }: AccountsLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </div>
  );
} 