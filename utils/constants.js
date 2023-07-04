export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  'http://localhost:3000';

export const BANK_NAME = 'Certs Bank';

export default {
  SERVER_URL,
  BANK_NAME,
};
