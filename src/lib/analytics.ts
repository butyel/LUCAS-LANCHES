/**
 * Analytics leve e opcional. Só dispara eventos quando um dataLayer
 * (GTM/GA4) já estiver presente no projeto; caso contrário vira no-op.
 */
type DataLayer = Array<Record<string, unknown>>;

declare global {
  interface Window {
    dataLayer?: DataLayer;
  }
}

export function track(
  event: string,
  params: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event, ...params });
  }
}