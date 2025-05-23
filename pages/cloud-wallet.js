import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { apiGetLocal, postRequestLocal } from 'utils/request';
import { useRouter } from 'next/router';

function OID4VPDemoFlow({ deepLinkURL }) {
  const [request, setRequest] = useState();
  const clientId = deepLinkURL.searchParams.get('client_id');

  async function loadRequest() {
    const requestURI = deepLinkURL.searchParams.get('request_uri');
    const requestResponse = await fetch(requestURI);
    const requestJWT = await requestResponse.text();
    const requestBody = JSON.parse(Buffer.from(requestJWT.split('.')[1], 'base64').toString());
    setRequest(requestBody);
  }

  async function handleSubmit() {
    console.log('handleSubmit', request.redirect_uri);
    const presentation = {};

    const res = await fetch(request.redirect_uri, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(presentation),
    });

    const resJSON = await res.json();
    console.log('resJSON', resJSON);
  }

  useEffect(() => {
    if (!request) {
      loadRequest();
    }
  }, []);

  return (
    <>
      <div className="p-10 m-auto text-center cardsContainer">
        <div className="flex items-center">
          <div className="mr-3 h-[24px]">
            <Image alt="truveralogo" src="/truveralogoblack.png" width={108} height={24} />
          </div>
          <div>
            <h1 className="Header">
              <span className="mr-2">|</span> Cloud Wallet OID4VP Present
            </h1>
          </div>
        </div>
        <div className="pt-5">
          <p>clientId: {clientId}</p>
          <p>
            openid request:
            <pre>{request ? JSON.stringify(request, null, 2) : 'loading...'}</pre>
          </p>
          {request && (
            <button className="launchBtn" onClick={handleSubmit}>
              Simulate Submission Flow
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default function Home() {
  const router = useRouter();
  const [oidDeeplink, setOidDeeplink] = useState();

  useEffect(() => {
    const deepLink = router.query.l && decodeURIComponent(router.query.l);
    if (deepLink) {
      setOidDeeplink(deepLink);
    }
  }, [router.query]);

  if (oidDeeplink) {
    const deepLinkURL = new URL(oidDeeplink);
    const isOID4VPRequest = deepLinkURL.protocol === 'openid:';
    if (isOID4VPRequest) {
      return <OID4VPDemoFlow deepLinkURL={deepLinkURL} />;
    }
  }

  return (
    <>
      <div className="p-10 m-auto text-center cardsContainer">
        <div className="flex items-center">
          <div className="mr-3 h-[24px]">
            <Image alt="truveralogo" src="/truveralogoblack.png" width={108} height={24} />
          </div>
          <div>
            <h1 className="Header">
              <span className="mr-2">|</span> Cloud Wallet Holder Demo
            </h1>
          </div>
        </div>
        <div className="grid gap-4 pt-5 text-center xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
          Demo page, accept an openid flow elsewhere.
        </div>
      </div>
    </>
  );
}
