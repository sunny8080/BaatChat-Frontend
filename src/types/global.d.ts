declare global {
  interface Window {
    dataLayer: any[];
    gtag: (command: string, targetIdOrEventName: string, params?: Record<string, unknown>) => void;
  }
}

export {};
