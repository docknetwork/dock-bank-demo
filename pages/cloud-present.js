import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { apiGetLocal, postRequestLocal } from 'utils/request';

// Demo wallet exists on same server at different page
const WEB_WALLET_URL = `${process.env.NEXT_PUBLIC_SERVER_URL}/cloud-wallet`;

function OID4VPProofRequest({ onVerified }) {
  const [proofRequest, setProofRequest] = useState();

  async function createProofRequest() {
    // Through the proxy create an openid proof request, this could also be done server side
    const { data } = await postRequestLocal('begin-request-proof', {
      templateId: process.env.NEXT_PUBLIC_QUOTIENT_LOAN_PROOF_TEMPLATE_ID,
    });

    const { proofRequest, qrUrl } = data;
    setProofRequest({
      ...proofRequest,
      qrUrl,
    });

    // Poll for results, could alternative use a webhook
    const int = setInterval(async () => {
      try {
        const { data: res } = await apiGetLocal(`handle-proof?proofID=${proofRequest.id}`);
        if (res.verified) {
          setProofRequest(res);
          onVerified();
          clearInterval(int);
        }
      } catch (e) {
        console.error(e);
      }
    }, 2000);
  }

  useEffect(() => {
    if (!proofRequest) {
      createProofRequest();
    }
  }, []);

  return (
    <div>
      <div className="orgCard">
        <div className="m-auto cardImg valign-middle">
          <div>
            {proofRequest ? (
              <>
                {/* Present typical mobile wallet QR code/deep link flow */}
                <QRCodeGenerator url={proofRequest.qrUrl} />
                <br />
                <a className="launchBtn" href={proofRequest.qrUrl}>
                  Use Deep Link
                </a>
                <br />
                <br />
                {/* Provide the OpenID deeplink/QR URL to the web wallet provider through URL params */}
                <a
                  className="launchBtn"
                  href={`${WEB_WALLET_URL}?l=${encodeURIComponent(proofRequest.qrUrl)}`}
                  target="_blank"
                  rel="noreferrer">
                  Use Web Wallet
                </a>
              </>
            ) : (
              <>Loading...</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isVerified, setIsVerified] = useState(false);

  function handleVerified() {
    setIsVerified(true);
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
              <span className="mr-2">|</span> Cloud Wallet Present Demo
            </h1>
          </div>
        </div>

        {isVerified ? (
          <div className="grid gap-4 pt-5 text-center xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
            Verified
          </div>
        ) : (
          <div className="grid gap-4 pt-5 text-center xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
            <OID4VPProofRequest onVerified={handleVerified} />
          </div>
        )}
      </div>
    </>
  );
}
