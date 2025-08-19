import { generateStructuredData } from '@/shared/seo-utils';

export default function StructuredData() {
  const structuredData = {
    ...generateStructuredData('service', {
      name: 'MPDEE Creative',
      description:
        'Professional audio production services specializing in radio commercial production, audio imaging, and event recording. High-quality sound design and production.',
      serviceType: 'Audio Production Services',
      url: 'https://creative.mpdee.co.uk',
    }),
    // Add specific service offerings
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Audio Production Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Radio Commercial Production',
            description:
              'Professional radio commercial production with voice talent, sound design, and mixing.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Audio Imaging',
            description:
              'Custom audio imaging for radio stations and podcasts.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Event Recording',
            description:
              'Professional event recording and post-production services.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Sound Design',
            description:
              'Custom sound design for commercials, podcasts, and media.',
          },
        },
      ],
    },
    // Add professional credentials
    makesOffer: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          serviceType: 'Professional Audio Production',
          areaServed: 'United Kingdom',
          availableChannel: {
            '@type': 'ServiceChannel',
            serviceUrl: 'https://creative.mpdee.co.uk',
            serviceSmsNumber: '+44',
          },
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
}
