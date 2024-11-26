import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Collapsible from '@radix-ui/react-collapsible';
import { Check } from 'lucide-react';

import { Separator } from 'components/ui/separator';
import { Button } from 'components/ui/button';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { apiGetLocal, postRequestLocal } from 'utils/request';
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
    const { data: proofRequest } = await postRequestLocal('create-proof-request-object', {
      did: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
      ...proofRequestSetupObject,
    });

    const { data: qrUrlData } = await postRequestLocal('get-oid4vp-url', {
      withRequestURI: true,
      proofRequestId: proofRequest.id,
    });

    setProofRequest({
      ...proofRequest,
      qrUrlData,
    });

    const int = setInterval(async () => {
      try {
        const { data: res } = await apiGetLocal(`handle-proof?proofID=${proofRequest.id}`);
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
        try {
          await axios.post(`${baseUrl}/openid/vp/${proofRequest.id}/callback`, {
            vp_token: dataObj.vp_token,
          });
        } catch (e) {
          console.error(e);
          throw new Error(
            `Likely failed to verify or invalid data: ${JSON.stringify(dataObj, null, 2)} resp: ${JSON.stringify((e.response && e.response.data) || {}, null, 2)}`
          );
        }
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
  const [showInstructions, setShowInstructions] = useState(false);
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
            <p className="text-justify mt-5">
              Use this page to test out mDL presentations.
              <br />
              Currently this page supports the Google Digital Credentials API implementation on
              Android.
              <br />
            </p>

            <p className="text-justify mt-5">
              <Collapsible.Root
                open={showInstructions}
                onOpenChange={setShowInstructions}
                className="CollapsibleRoot">
                <div className="text-justify mt-5">
                  <Collapsible.Trigger asChild>
                    <Button>
                      {showInstructions ? '- Hide Instructions' : '+ View Instructions'}
                    </Button>
                  </Collapsible.Trigger>
                </div>
                <Collapsible.Content>
                  <div className="text-left mt-5">
                    <div className="text-left mt-5 text-lg">Device Requirements</div>
                    <ol className="pl-5 list-disc">
                      <li>Android device</li>
                      <li>Google Play services 23.40 (or later)</li>
                      <li>Chrome 128 (or later)</li>
                      <li>Enable the flag at chrome://flags#web-identity-digital-credentials</li>
                      <li>Ensure your device allows installs from, &quot;Unknown Sources&quot;</li>
                    </ol>
                  </div>

                  <div className="text-left mt-5">
                    <div className="text-left mt-5 text-lg">Setup the Google IC Wallet</div>
                    <ol className="pl-5 list-disc">
                      <li>
                        Download and install the apk from
                        <a
                          href="https://drive.google.com/file/d/1VVuN1b43FY8dpYsMDtYsQEbyabwcIrh6/view?usp=sharing"
                          download>
                          Google Drive
                        </a>
                      </li>
                      <li>Run the IC Wallet app</li>
                      <li>
                        Add a new credential by clicking the, &quot;Add Self Signed Document&quot;
                        button and accepting the defaults
                      </li>
                    </ol>
                  </div>

                  <div className="text-left mt-5">
                    <div className="text-left mt-5 text-lg">Test it out</div>

                    <ol className="pl-5 list-disc">
                      <li>Open Chrome on your Android device</li>
                      <li>
                        Navigate to&nbsp;
                        <a href="https://bank-demo.dock.io/mdl" target="_blank" rel="noreferrer">
                          https://bank-demo.dock.io/mdl
                        </a>
                      </li>
                      <li>Try out the sample proof requests</li>
                      <li>
                        If successful, a Verified message will display and the response will be
                        shown below
                      </li>
                    </ol>
                  </div>
                </Collapsible.Content>
              </Collapsible.Root>
            </p>
          </div>
        </div>
        <div className="mt-10 mb-10">
          <Separator />
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
