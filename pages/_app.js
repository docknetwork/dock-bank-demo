import React from 'react';
import Head from 'next/head';
import DockBankHelper from 'components/dock-bank-helper';
import PageLayout from 'components/page-layout';
import { BANK_NAME } from 'utils/constants';
import { Toaster } from '../components/ui/sonner';

import '../styles/globals.css';
import '../styles/custom.css';

// Fonts
import '../public/fonts/satoshi.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{BANK_NAME}</title>
      </Head>
      <Toaster position="top-right" richColors closeButton />
      <PageLayout>
        <DockBankHelper />

        <Component {...pageProps} />
      </PageLayout>
    </>
  );
}

export default MyApp;
