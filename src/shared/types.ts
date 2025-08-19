// Shared types across MPDEE ecosystem

export interface MPDEEService {
  name: 'creative' | 'development' | 'support';
  title: string;
  description: string;
  url: string;
  icon: string;
  primaryColor: string;
  features: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  service: string;
  message: string;
  source: 'hub' | 'direct';
}

export interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  service?: string;
}

export interface SEOConfig {
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  ogImage?: string;
}

// Brand consistency
export const MPDEE_BRAND = {
  name: 'MPDEE',
  domain: 'mpdee.co.uk',
  services: {
    creative: {
      subdomain: 'creative.mpdee.co.uk',
      name: 'MPDEE Creative',
      color: '#3B82F6', // Blue
    },
    development: {
      subdomain: 'development.mpdee.co.uk',
      name: 'MPDEE Development',
      color: '#F59E0B', // Orange
    },
    support: {
      subdomain: 'support.mpdee.co.uk',
      name: 'MPDEE Support',
      color: '#EF4444', // Red
    },
  },
} as const;
