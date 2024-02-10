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
  QUOTIENT: "b156507a-949f-4dff-ab2f-ba98ea840678",
  EQUINET: "d1c42f71-6108-4520-a09d-c8a19d720bd2",
  URBANSCAPE: "78fbd2de-9686-4c70-96d4-bbb4630bfb49",
}
