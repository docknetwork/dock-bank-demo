export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  'http://localhost:3000';

export const dockUrl = process.env.NEXT_PUBLIC_DOCK_API_URL || 'https://api-testnet.dock.io';
export const BANK_NAME = 'Verifi Bank';
export const HOTEL_NAME = 'Dockside Resorts';

export default {
  SERVER_URL,
  BANK_NAME,
  HOTEL_NAME,
};
