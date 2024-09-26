import React from 'react';
import Head from 'next/head';
import Header from 'components/org/quotient/Header';
import { useQRCode } from 'next-qrcode';
import { SERVER_URL } from 'utils/constants';

export default function Wallet() {
  const { Canvas } = useQRCode();
  const qrCodeSize = 400;
  const walletUrl = `https://${SERVER_URL.replace('https://', '')}/api/getwallet`;
  return (
    <>
      <Head>
        <title>Quotient Wallet</title>
      </Head>
      <Header />
      <div className="mt-2 mb-4">
        <h2 className="text-3xl font-medium text-slate-700">Get the Quotient Wallet</h2>
        <p className="text-xl">
          Scan the QR code to download the Quotient Wallet for Android or iOS.
        </p>

        <div className="flex justify-center m-auto overflow-hidden rounded-lg">
          <Canvas
            text={walletUrl}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: qrCodeSize,
              color: {
                dark: '#0E387A',
                light: '#FFFFFF',
              },
            }}
          />
        </div>
      </div>
    </>
  );
}
