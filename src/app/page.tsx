import { Hero, Services, ClientLogin, Contact, ConstructionBanner } from '@/components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | MPDEE Creative - Professional Audio Production Services',
  description:
    'Professional audio production services specializing in radio commercial production, audio imaging, and event recording. High-quality sound design and production.',
  keywords:
    'radio commercials, audio production, radio commercial production, audio imaging, event recording, voice talent, sound design, radio advertising',
  openGraph: {
    title: 'Home | MPDEE Creative - Professional Audio Production Services',
    description:
      'Professional audio production services specializing in radio commercial production, audio imaging, and event recording.',
    type: 'website',
    url: 'https://mpdee-creative.vercel.app',
    siteName: 'MPDEE Creative',
    images: [
      {
        url: '/images/mpdee_logo_with_text.png',
        width: 1200,
        height: 630,
        alt: 'MPDEE Creative - Professional Audio Production Services',
      },
    ],
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Home | MPDEE Creative - Professional Audio Production Services',
    description:
      'Professional audio production services specializing in radio commercial production, audio imaging, and event recording.',
    images: ['/images/mpdee_logo_with_text.png'],
    creator: '@mpdee_creative',
    site: '@mpdee_creative',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function Home() {
  return (
    <>
      {/* Construction Banner */}
      <ConstructionBanner className="mt-16" />

      {/* Hero Section */}
      <Hero />

      {/* Services Section */}
      <Services />

      {/* Client Login Section */}
      <ClientLogin />

      {/* Contact Section */}
      <Contact />
    </>
  );
} 