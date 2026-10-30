import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { generateMPDEEMetadata } from '@/shared/seo-utils';
import Script from 'next/script';
import Layout from '@/components/Layout';
import StructuredData from '@/components/StructuredData';
import './globals.css';

const manrope = localFont({
  src: '../../public/fonts/Manrope.ttf',
  variable: '--font-manrope',
  display: 'swap',
  weight: '200 800',
});

export const metadata: Metadata = {
  ...generateMPDEEMetadata({
    title: 'MPDEE Creative — Good ideas. Unmistakable sound.',
    description:
      'Professional audio production services specializing in radio commercial production, audio imaging, and event recording. High-quality sound design and production.',
    keywords: [
      'radio commercials',
      'audio production',
      'radio commercial production',
      'audio imaging',
      'event recording',
      'voice talent',
      'sound design',
      'radio advertising',
      'professional audio',
      'commercial production',
    ],
    canonicalUrl: '/',
    service: 'creative',
  }),
  icons: {
    icon: [
      { url: '/images/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/images/favicon/favicon.ico' },
    ],
    apple: [
      {
        url: '/images/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        url: '/images/favicon/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/images/favicon/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/images/favicon/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f7f6f2',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <StructuredData />
      </head>
      <body>
        {/* Cross-Domain Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-FNQX2LJQQE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics-cross-domain" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FNQX2LJQQE', {
              linker: {
                domains: ['mpdee.co.uk', 'creative.mpdee.co.uk', 'development.mpdee.co.uk', 'support.mpdee.co.uk']
              },
              custom_map: {
                'custom_parameter_1': 'service_conversion'
              }
            });
            
            // Track conversions
            function trackConversion(action) {
              gtag('event', 'conversion', {
                'send_to': 'G-FNQX2LJQQE/' + action,
                'service_type': 'creative',
                'source_site': 'specialized'
              });
            }
            
            // Track hub referrals
            function trackHubReferral() {
              gtag('event', 'hub_referral', {
                'service_type': 'creative',
                'destination': 'hub'
              });
            }
            
            window.trackConversion = trackConversion;
            window.trackHubReferral = trackHubReferral;
          `}
        </Script>
        
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
