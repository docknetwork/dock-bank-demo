import React from 'react';
import Head from 'next/head';

import DockBankHelper from 'components/dock-bank-helper';

import '../styles/globals.css';

// Fonts
import '../public/fonts/satoshi.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Dock Bank</title>
      </Head>
      <DockBankHelper />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
