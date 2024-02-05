import React from 'react';
import { useRouter } from 'next/router';

import Button from 'components/button';
import RequireProof from 'components/require-proof';
import InfoAlert from 'components/info-alert';
import { useLocalStorage } from 'utils/hooks';

export default function Home() {
  const router = useRouter();
  const [, setUserData] = useLocalStorage('userData', null);

  const onPresentedProof = (data) => {
    setUserData(data);
    router.push('/dashboard');
  };

  return (
    <>
      <div className="flex flex-col-reverse lg:flex-row lg:h-screen">
        <div
          className="flex items-center justify-center w-full space-y-8 bg-white lg:w-1/2"
          style={{ width: '100%' }}>
          <div className="w-full px-8 md:px-32 lg:px-24">
            <p className="text-xl font-bold text-center text-gray-800">
              Scan the QR Code to Sign In
            </p>
            <RequireProof type="proofForSignIn" onPresentedProof={onPresentedProof} />
            <InfoAlert>
              Required credentials: Customer Credential, Reward Program, Proof of Address, KYC
              Credential, Bank Account Details. These credentials can be obtained by going trough
              the onboarding process.
            </InfoAlert>
            <Button
              type="button"
              className="block w-full"
              onClick={() => router.push('/onboarding')}>
              Onboarding
            </Button>
            <Button
              type="button"
              className="block w-full"
              onClick={() => router.push('/dashboard')}>
              Dashboard
            </Button>
          </div>
        </div>
        <div
          className="items-center justify-around w-full text-center lg:flex lg:w-1/2 bg-zinc-900"
          style={{
            flexShrink: 0,
            background: 'url(/bg.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}>
          <div
            className="flex-col items-center w-full px-0 py-10 mx-auto space-y-6"
            style={{
              maxWidth: '400px',
              width: '100%',
            }}>
            <h1 className="text-4xl font-bold text-white">
              Demo Verifiable Credential technology for trusted digital interactions
            </h1>

            <p className="mt-1 text-white">
              In this interactive demo you will see how Dock&apos;s technology can be used to solve
              real world problems. Verifiable Credentials allow users to interact with various
              services in a trusted manner and prove to others their attestations. This is just one
              use case of many.
            </p>
            <br />
            <br />
            <h3 className="font-bold text-white">
              Get the Dock Wallet to store and manage credentials
            </h3>

            <div className="flex">
              <div className="flex items-center justify-around w-full p-2 ml-4">
                <a
                  data-w-id="d362f523-4769-a52a-7897-ad455d324f08"
                  href="https://apps.apple.com/ph/app/dock-wallet/id1565227368"
                  target="_blank"
                  className="mr-2"
                  rel="noreferrer">
                  <img
                    src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/62874177177afb45315d5c6a_Frame.png"
                    loading="lazy"
                    width="178"
                    alt=""
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.dockapp"
                  target="_blank"
                  rel="noreferrer">
                  <img
                    src="https://uploads-ssl.webflow.com/5e97941735e37a5ef19d10aa/62874176e24abd6ceb8583ca_Frame%20255.png"
                    loading="lazy"
                    width="178"
                    data-w-id="d362f523-4769-a52a-7897-ad455d324f0b"
                    alt=""
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
