// Shared SEO utilities for MPDEE ecosystem
import { Metadata } from 'next';
import { MPDEE_BRAND } from './types';

export const generateMPDEEMetadata = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  service,
  ogImage = '/images/logo-trans.png',
}: {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl: string;
  service?: 'creative' | 'development' | 'support';
  ogImage?: string;
}): Metadata => {
  const fullTitle = title.includes('MPDEE') ? title : `${title} | MPDEE`;
  const baseUrl = service
    ? `https://${MPDEE_BRAND.services[service].subdomain}`
    : `https://${MPDEE_BRAND.domain}`;

  return {
    title: fullTitle,
    description,
    keywords: [...keywords, 'MPDEE', 'professional services', 'UK'],
    authors: [
      { name: service ? MPDEE_BRAND.services[service].name : MPDEE_BRAND.name },
    ],
    creator: service ? MPDEE_BRAND.services[service].name : MPDEE_BRAND.name,
    publisher: MPDEE_BRAND.name,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: canonicalUrl,
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
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: `${baseUrl}${canonicalUrl}`,
      title: fullTitle,
      description,
      siteName: service ? MPDEE_BRAND.services[service].name : MPDEE_BRAND.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${service ? MPDEE_BRAND.services[service].name : MPDEE_BRAND.name} Logo`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [ogImage],
    },
  };
};

export const generateStructuredData = (
  type: 'hub' | 'service',
  serviceData?: {
    name: string;
    description: string;
    serviceType: string;
    url: string;
  }
) => {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: MPDEE_BRAND.name,
    url: `https://${MPDEE_BRAND.domain}`,
    logo: `https://${MPDEE_BRAND.domain}/images/logo-trans.png`,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        availableLanguage: ['English'],
        areaServed: 'GB',
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'United Kingdom',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GB',
      addressRegion: 'United Kingdom',
    },
  };

  if (type === 'hub') {
    return {
      ...baseData,
      '@type': ['Organization', 'Service'],
      description:
        'Choose from three specialized MPDEE services: Professional audio production, custom web development, or expert IT support.',
      serviceType: 'Professional Services Hub',
      sameAs: [
        `https://${MPDEE_BRAND.services.creative.subdomain}`,
        `https://${MPDEE_BRAND.services.development.subdomain}`,
        `https://${MPDEE_BRAND.services.support.subdomain}`,
      ],
    };
  }

  if (type === 'service' && serviceData) {
    return {
      ...baseData,
      '@type': ['Organization', 'LocalBusiness'],
      name: serviceData.name,
      description: serviceData.description,
      url: serviceData.url,
      serviceType: serviceData.serviceType,
      parentOrganization: {
        '@type': 'Organization',
        name: MPDEE_BRAND.name,
        url: `https://${MPDEE_BRAND.domain}`,
      },
    };
  }

  return baseData;
};
