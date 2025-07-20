import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import Layout from '@/components/Layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MPDEE Creative - Professional Web Design & Development',
  description:
    'Creative web design and development services. We create beautiful, functional websites that drive results for your business. Expert UI/UX design and full-stack development.',
  keywords: 'web design, web development, creative design, UI/UX design, full-stack development, business websites',
  authors: [{ name: 'MPDEE Creative' }],
  robots: 'index, follow',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
} 