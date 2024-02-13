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

export const PROOFT_TEMPLATES_IDS = {
  QUOTIENT: process.env.NEXT_PUBLIC_QUOTIENT_PROOF_TEMPLATE_ID,
  EQUINET: process.env.NEXT_PUBLIC_EQUINET_PROOF_TEMPLATE_ID,
  URBANSCAPE: process.env.NEXT_PUBLIC_URBANSCAPE_PROOF_TEMPLATE_ID,
}
