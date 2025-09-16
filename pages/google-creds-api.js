import React, { useState } from 'react';
import Head from 'next/head';

const originTrialKey = process.env.NEXT_PUBLIC_ORIGIN_TRIAL_KEY;
const credsApiRequest = {
  protocol: 'openid4vp-v1-unsigned',
  request:
    {
      client_metadata: {
        client_id: 'bank-demo.truvera.io',
        client_id_scheme: 'web-origin',
        vp_formats_supported: { mso_mdoc: { deviceauth_alg_values: [-7], issuerauth_alg_values: [-7] } }
      },
      dcql_query: {
        credentials: [{
          claims: [
            { path: ['org.iso.18013.5.1', 'family_name'] },
            { path: ['org.iso.18013.5.1', 'given_name'] },
            { path: ['org.iso.18013.5.1', 'age_over_21'] }
          ],
          format: 'mso_mdoc',
          id: 'cred1',
          meta: { doctype_value: 'org.iso.18013.5.1.mDL' }
        }]
      },
      nonce: '-vz4qxeHjbmcjvfVBKJ1PywWnLawwxLi50CVTrOAGmw=',
      response_mode: 'dc_api',
      response_type: 'vp_token'
    },
  state: {
    nonce: '-vz4qxeHjbmcjvfVBKJ1PywWnLawwxLi50CVTrOAGmw=',
    private_key: 'kN37SKg-iu3N3wSXAhuBXxwDkbo5rvUFYCr9BCm34Qs=',
    public_key:
      'BF4nDPpbH9jac22-pJfgFqGLj-Qh-vPA4Hmtry6CodaLzGcn0LTGWhBIz0LONTRJj4GRx1nd6pb8UeGR0lqQlVc=',
  },
};

export default function GoogleCredsAPI({ title, desc, proofRequestSetupObject }) {
  const [error, setError] = useState();
  const [res, setRes] = useState();
  async function handleTestRequest() {
    try {
      const credentialResponse = await navigator.credentials.get({
        digital: {
          requests: [{
            protocol: credsApiRequest.protocol,
            data: credsApiRequest.request
          }]
        }
      });

      if (credentialResponse.constructor.name === 'DigitalCredential') {
        const data = credentialResponse.data;
        const protocol = credentialResponse.protocol;
        const responseForServer = {
          protocol,
          data,
          state: credsApiRequest.state,
        };
        setRes(responseForServer);
      } else if (credentialResponse.constructor.name === 'IdentityCredential') {
        const data = credentialResponse.token;
        const protocol = 'oid4vp';
        const responseForServer = {
          protocol,
          data,
          state: credsApiRequest.state,
        };
        setRes(responseForServer);
      } else {
        throw new Error('Unknown response type');
      }
    } catch (e) {
      console.error(e);
      setError(e.message || 'unknown');
    }
  }

  return (
    <div>
      <Head>
        <meta httpEquiv="origin-trial" content={originTrialKey} />
      </Head>
      <button onClick={handleTestRequest}>test it now</button>

      <br />
      <br />
      {error && <pre>{error}</pre>}
      {res && <pre>{JSON.stringify(res, null, 2)}</pre>}
    </div>
  );
}
