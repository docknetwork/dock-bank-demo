import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as Collapsible from '@radix-ui/react-collapsible';

import { Separator } from 'components/ui/separator';
import { Button } from 'components/ui/button';
import { QRCodeGenerator } from 'components/qrcode/qr-generator';
import { postRequestLocal } from 'utils/request';

const originTrialKey = process.env.NEXT_PUBLIC_ORIGIN_TRIAL_KEY;
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
              path: ["$['org.iso.18013.5.1']['given_name']", 'given_name'],
              intent_to_retain: false,
            },
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

const mdlDCQLQueryClaims = [
  { path: ['org.iso.18013.5.1', 'age_over_18'] },
  { path: ['org.iso.18013.5.1', 'given_name'] },
];

function OID4VPProofRequest({
  title,
  desc,
  proofRequestSetupObject,
  dcqlQueryClaims,
  onPres,
  setError,
}) {
  const [proofRequest, setProofRequest] = useState();

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
  }

  useEffect(() => {
    if (!proofRequest) {
      createProofRequest();
    }
  });

  async function handleCredsRequest() {
    const REQUESTED_CRED_ID = 'cred1';

    const credsApiRequest = {
      protocol: 'openid4vp-v1-unsigned',
      request: {
        response_type: 'vp_token',
        nonce: proofRequest.nonce,
        presentation_definition: proofRequest.request,
        client_metadata: {
          client_id: 'bank-demo.truvera.io',
          client_id_scheme: 'web-origin',
          vp_formats_supported: {
            mso_mdoc: { deviceauth_alg_values: [-7], issuerauth_alg_values: [-7] },
          },
        },
        dcql_query: {
          credentials: [
            {
              claims: dcqlQueryClaims,
              format: 'mso_mdoc',
              id: REQUESTED_CRED_ID,
              meta: { doctype_value: 'org.iso.18013.5.1.mDL' },
            },
          ],
        },
        response_mode: 'dc_api',
      },
      state: {
        nonce: proofRequest.nonce,
        private_key: 'kN37SKg-iu3N3wSXAhuBXxwDkbo5rvUFYCr9BCm34Qs=',
        public_key:
          'BF4nDPpbH9jac22-pJfgFqGLj-Qh-vPA4Hmtry6CodaLzGcn0LTGWhBIz0LONTRJj4GRx1nd6pb8UeGR0lqQlVc=',
      },
    };

    try {
      const credentialResponse = await navigator.credentials.get({
        digital: {
          requests: [
            {
              protocol: credsApiRequest.protocol,
              data: credsApiRequest.request,
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
          data: {
            vp_token: data.vp_token[REQUESTED_CRED_ID][0],
          },
          state: credsApiRequest.state,
        };
      } else if (credentialResponse.constructor.name === 'IdentityCredential') {
        const data = JSON.parse(credentialResponse.token);
        const protocol = 'oid4vp';
        responseForServer = {
          protocol,
          data,
          state: credsApiRequest.state,
        };
      } else {
        throw new Error('Unknown response type');
      }

      const dataObj = responseForServer.data;
      if (dataObj.vp_token) {
        // we must act as the client submitting the presentation now
        await axios.post('/api/submit-mdl-debug', {
          mdlHex: dataObj.vp_token,
        });

        onPres(true);
      } else {
        throw new Error('Cannot find vp_token in creds api response');
      }
    } catch (e) {
      console.error(e);
      setError(`${e.message || 'unknown error'} - ${e.stack || 'no stack'}`);
    }
  }

  return (
    <div>
      <Head>
        <meta httpEquiv="origin-trial" content={originTrialKey} />
      </Head>

      <div className="orgCard">
        <div className="m-auto cardImg valign-middle">
          <p className="mb-5 font-bold">{title}</p>
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
      <div className="p-10 m-auto text-center cardsContainer">
        <div>
          <div className="flex items-center">
            <div className="mr-3 h-[24px]">
              <Image alt="truveralogo" src="/truveralogoblack.png" width={108} height={24} />
            </div>
            <h1 className="Header">
              <span className="mr-2">|</span> MDL Debugging
            </h1>
          </div>
        </div>
        <div className="mt-10 mb-10">
          <Separator />
        </div>
        <div className="grid gap-4 pt-5 text-center xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 sm:grid-cols-1">
          <OID4VPProofRequest
            proofRequestSetupObject={mdlProofRequest}
            dcqlQueryClaims={mdlDCQLQueryClaims}
            title="Over 18 check"
            onPres={handlePres}
            setError={handleError}
          />
        </div>
        <div className="mt-10 mb-10">
          <Separator />
        </div>
        <div className="m-auto mt-5" style={{ textAlign: 'left' }}>
          {error && <pre>Error: {error}</pre>}
          {res ? (
            <pre>MDL submitted for debugging</pre>
          ) : (
            <p>Scan an above QR code or click the button</p>
          )}
        </div>
      </div>
    </>
  );
}
