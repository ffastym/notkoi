export const TON_CURRENCY_ENABLED = import.meta.env.VITE_TON_CURRENCY_ENABLED === 'true';

export type Locality = 'en' | 'ua';

export const ALLOWED_LOCALITIES: Locality[] = ['en', 'ua'];

export const DEFAULT_LOCALITY: Locality = 'en';
