type GtagFn = (command: string, target: string | Date, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

const GA_ID = import.meta.env.VITE_GA_ID as string | undefined;
const SHEETS_WEBHOOK_URL = import.meta.env.VITE_SHEETS_WEBHOOK_URL as string | undefined;
const VISIT_SESSION_KEY = 'portfolio_visit_logged';
let initialized = false;

export const initAnalytics = () => {
  if (!GA_ID || initialized || typeof window === 'undefined') return;
  initialized = true;

  window.dataLayer = window.dataLayer || [];
  const gtag: GtagFn = (command, target, params) => {
    window.dataLayer?.push([command, target, params].filter(Boolean));
  };
  window.gtag = window.gtag || gtag;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  window.gtag('config', GA_ID, { anonymize_ip: true });
};

export const trackEvent = (eventName: string, params?: Record<string, unknown>) => {
  if (!GA_ID || !window.gtag) return;
  window.gtag('event', eventName, params);
};

export const trackSectionView = (mainTab: string, devSubTab?: string | null) => {
  trackEvent('section_view', {
    main_tab: mainTab,
    dev_sub_tab: devSubTab ?? 'none',
  });
};

export const initVisitTracking = () => {
  if (!SHEETS_WEBHOOK_URL || typeof window === 'undefined') return;
  if (sessionStorage.getItem(VISIT_SESSION_KEY)) return;
  sessionStorage.setItem(VISIT_SESSION_KEY, '1');

  try {
    void fetch(SHEETS_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: JSON.stringify({ event: 'visit' }),
      keepalive: true,
    });
  } catch {
    // Ignore logging failures.
  }
};
