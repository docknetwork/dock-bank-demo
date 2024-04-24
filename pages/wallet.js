import React from 'react';
import Head from 'next/head';
import Header from 'components/org/quotient/Header';
import { useQRCode } from 'next-qrcode';
import { SERVER_URL } from 'utils/constants';

export default function Wallet() {
  const { Canvas } = useQRCode();
  const qrCodeSize = 400;
  const walletUrl = `${SERVER_URL}/api/getwallet`;
  return (
    <>
      <Head>
        <title>Quotient Wallet</title>
      </Head>
      <Header />
      <div className='mb-4 mt-2 '>
        <h2 className='font-medium text-3xl text-slate-700'>Get the Quotient Wallet</h2>
        <p className='text-xl'>Scan the QR code to download the Quotient Wallet for Android or iOS.</p>

        <div className="m-auto rounded-lg overflow-hidden flex justify-center">
          <Canvas
            text={walletUrl}
            options={{
              errorCorrectionLevel: 'M',
              margin: 3,
              scale: 4,
              width: qrCodeSize,
              color: {
                dark: '#0E387A',
                light: '#FFFFFF'
              }
            }}
          />
        </div>
      </div>
    </>
  );
}
