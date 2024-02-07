import React from 'react';
import Head from 'next/head';
import DockBankHelper from 'components/dock-bank-helper';
import { BANK_NAME } from 'utils/constants';

import '../styles/globals.css';

// Fonts
import '../public/fonts/satoshi.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{BANK_NAME}</title>
      </Head>
      <DockBankHelper />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
