import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { Separator } from 'components/ui/separator';
import { Button } from 'components/ui/button';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { apiGet, postRequest } from 'utils/request';
import { dockUrl } from 'utils/constants';

const baseUrl = process.env.NEXT_PUBLIC_DOCK_API_URL;

const mdlProofRequest = {
  name: 'Proof request',
  nonce: '-vz4qxeHjbmcjvfVBKJ1PywWnLawwxLi50CVTrOAGmw=',
  request: {
    name: 'MDL age over 18 test',
    purpose: 'To check if over 18 years old',
    input_descriptors: [
      {
        name: 'MDL age over 18 test',
        purpose: 'To check if over 18 years old',
        id: 'org.iso.18013.5.1.mDL',
        format: {
          mso_mdoc: {
            alg: ['EdDSA', 'ES256'],
          },
        },
        constraints: {
          limit_disclosure: 'required',
          fields: [
            {
              path: ["$['org.iso.18013.5.1']['age_over_18']", 'age_over_18'],
              intent_to_retain: false,
            },
          ],
        },
      },
    ],
  },
};

const mdlProofRequestName = {
  name: 'Proof request',
  nonce: '-vz4qxeHjbmcjvfVBKJ1PywWnLawwxLi50CVTrOAGmw=',
  request: {
    name: 'MDL get name test',
    purpose: 'To get your name',
    input_descriptors: [
      {
        name: 'MDL get name test',
        purpose: 'To get your name',
        id: 'org.iso.18013.5.1.mDL',
        format: {
          mso_mdoc: {
            alg: ['EdDSA', 'ES256'],
          },
        },
        constraints: {
          limit_disclosure: 'required',
          fields: [
            {
              path: ["$['org.iso.18013.5.1']['family_name']"],
              intent_to_retain: false,
            },
            {
              path: ["$['org.iso.18013.5.1']['given_name']"],
              intent_to_retain: false,
            },
          ],
        },
      },
    ],
  },
};

function OID4VPProofRequest({ title, desc, proofRequestSetupObject, onPres, setError }) {
  const [proofRequest, setProofRequest] = useState();
  const [isVerified, setIsVerified] = useState(false);

  async function createProofRequest() {
    const { data: proofRequest } = await postRequest(`${dockUrl}/proof-requests`, {
      did: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
      ...proofRequestSetupObject,
    });

    const { data: qrUrlData } = await postRequest(
      `${dockUrl}/openid/vp/${proofRequest.id}/request-url`,
      {
        withRequestURI: true,
      }
    );

    setProofRequest({
      ...proofRequest,
      qrUrlData,
    });

    const int = setInterval(async () => {
      try {
        const { data: res } = await apiGet(`${dockUrl}/proof-requests/${proofRequest.id}`);
        if (res.verified) {
          setProofRequest(res);
          setIsVerified(true);
          clearInterval(int);

          if (onPres) {
            onPres(res);
          }
        }
      } catch (e) {
        console.error(e);
      }
    }, 3000);
  }

  useEffect(() => {
    if (!proofRequest) {
      createProofRequest();
    }
  });

  async function handleCredsRequest() {
    console.log('handleCredsRequest', proofRequest);

    const credsApiRequest = {
      protocol: 'openid4vp',
      request: JSON.stringify({
        client_id: 'bank-demo.dock.io',
        client_id_scheme: 'web-origin',
        response_type: 'vp_token',
        nonce: proofRequest.nonce,
        presentation_definition: proofRequest.request,
      }),
      state: {
        nonce: proofRequest.nonce,
        private_key: 'kN37SKg-iu3N3wSXAhuBXxwDkbo5rvUFYCr9BCm34Qs=',
        public_key:
          'BF4nDPpbH9jac22-pJfgFqGLj-Qh-vPA4Hmtry6CodaLzGcn0LTGWhBIz0LONTRJj4GRx1nd6pb8UeGR0lqQlVc=',
      },
    };

    try {
      const credentialResponse = await navigator.identity.get({
        digital: {
          providers: [
            {
              protocol: credsApiRequest.protocol,
              request: credsApiRequest.request,
            },
          ],
        },
      });

      let responseForServer;
      if (credentialResponse.constructor.name === 'DigitalCredential') {
        const data = credentialResponse.data;
        const protocol = credentialResponse.protocol;
        responseForServer = {
          protocol,
          data,
          state: credsApiRequest.state,
        };
      } else if (credentialResponse.constructor.name === 'IdentityCredential') {
        const data = credentialResponse.token;
        const protocol = 'oid4vp';
        responseForServer = {
          protocol,
          data,
          state: credsApiRequest.state,
        };
      } else {
        throw new Error('Unknown response type');
      }

      const dataObj = JSON.parse(responseForServer.data);
      if (dataObj.vp_token) {
        // we must act as the client submitting the presentation now
        await axios.post(`${baseUrl}/openid/vp/${proofRequest.id}/callback`, dataObj);
      } else {
        throw new Error('Cannot find vp_token in creds api response');
      }
    } catch (e) {
      console.error(e);
      setError(e.message || 'unknown');
    }
  }

  return (
    <div>
      <Head>
        <meta
          httpEquiv="origin-trial"
          content="ApSITCHddV0QaCFrEYa/rwldMORVDXzULWdpxVeeSYhTdBLl2wgkuQxLGMg37Q3lBAA0Wq0KWqbcj+A3BA+kBQcAAABxeyJvcmlnaW4iOiJodHRwczovL2RvY2suaW86NDQzIiwiZmVhdHVyZSI6IldlYklkZW50aXR5RGlnaXRhbENyZWRlbnRpYWxzIiwiZXhwaXJ5IjoxNzQ0NzYxNTk5LCJpc1N1YmRvbWFpbiI6dHJ1ZX0="
        />
      </Head>

      <div className="orgCard">
        <div className="cardImg valign-middle m-auto">
          <p className="font-bold mb-5">{title}</p>
          {isVerified ? (
            <div className="pt-5 min-h-28 text-sm">Verified!</div>
          ) : (
            <div>
              {proofRequest && proofRequest.qrUrlData && proofRequest.qrUrlData.url ? (
                <>
                  <QRCodeGenerator
                    url={proofRequest.qrUrlData.url.replace('openid://', 'openid4vp://')}
                  />
                  <br />
                  <Button onClick={handleCredsRequest}>Use Google Creds API</Button>
                  <br />
                  <br />
                </>
              ) : (
                <>Loading...</>
              )}
            </div>
          )}
        </div>
        <hr />
        <div className="pt-5 min-h-28">
          <p className="text-sm">{desc}</p>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
}

export default function Home() {
  const [res, setRes] = useState();
  const [error, setError] = useState();

  function handlePres(res) {
    setRes(res);
  }

  function handleError(err) {
    setError(err);
  }

  return (
    <>
      <div className="cardsContainer m-auto p-10 text-center">
        <div className="flex">
          <div className="mr-5">
            <Image alt="docklogo" src="/docklogo.png" width={84} height={32} />
          </div>
          <div>
            <h1 className="Header">
              <span className="mr-2">|</span> MDL Demo
            </h1>
          </div>
        </div>
        <div className="pt-5 grid xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1 gap-4 text-center">
          <OID4VPProofRequest
            proofRequestSetupObject={mdlProofRequest}
            title="Over 18 check"
            desc="Scan this QR code with your OpenID compatible MDL Wallet to present an age over 18 check to the Dock API."
            onPres={handlePres}
            setError={handleError}
          />
          <OID4VPProofRequest
            proofRequestSetupObject={mdlProofRequestName}
            title="Get name check"
            desc="Scan this QR code with your OpenID compatible MDL Wallet to present your name to the Dock API."
            onPres={handlePres}
            setError={handleError}
          />
        </div>
        <div className="mt-10 mb-10">
          <Separator />
        </div>
        <div className="mt-5 m-auto" style={{ textAlign: 'left' }}>
          {error && <pre>Error: {error}</pre>}
          {res ? (
            <pre>
              Verified: {res.verified ? 'true' : 'false'}
              <br />
              <br />
              {JSON.stringify(res.presentation || {}, null, 2)}
            </pre>
          ) : (
            <p>Scan an above QR code or click the button</p>
          )}
        </div>
      </div>
    </>
  );
}
