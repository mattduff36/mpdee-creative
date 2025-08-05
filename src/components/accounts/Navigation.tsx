'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Navigation() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        // Redirect to home page after successful logout
        router.push('/');
      } else {
        console.error('Logout failed:', data.error);
        // Even if the API call fails, redirect to login
        router.push('/accounts/login');
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Even if there's an error, redirect to login
      router.push('/accounts/login');
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              MPDEE Creative Accounting
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <nav className="flex space-x-8">
              <Link
                href="/accounts"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/accounts/clients"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Clients
              </Link>
              <Link
                href="/accounts/invoices"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Invoices
              </Link>
            </nav>

            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoggingOut ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Logging out...
                </div>
              ) : (
                'Logout'
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
} 