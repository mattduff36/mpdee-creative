// Shared analytics utilities for MPDEE ecosystem

export const trackEvent = (event: {
  action: string;
  category: string;
  label?: string;
  value?: number;
  service?: string;
}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      service_type: event.service,
    });
  }
};

export const trackServiceReferral = (
  service: string,
  source: string = 'hub'
) => {
  trackEvent({
    action: 'service_referral',
    category: 'navigation',
    label: service,
    service: service,
  });

  // Also track as conversion for Google Ads
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: 'G-FNQX2LJQQE/service_referral',
      value: 1,
      currency: 'GBP',
      transaction_id: `${service}_${Date.now()}`,
    });
  }
};

export const trackContactFormSubmission = (service: string, source: string) => {
  trackEvent({
    action: 'contact_form_submit',
    category: 'lead_generation',
    label: service,
    service: service,
  });
};

export const trackPageView = (pagePath: string, pageTitle: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-FNQX2LJQQE', {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// Global gtag declaration
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}
