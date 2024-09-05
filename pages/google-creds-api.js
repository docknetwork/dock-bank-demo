import React, { useState } from 'react';
import Head from 'next/head';

const credsApiRequest = {
  protocol: 'openid4vp',
  request:
    '{"client_id": "bank-demo.dock.io", "client_id_scheme": "web-origin", "response_type": "vp_token", "nonce": "-vz4qxeHjbmcjvfVBKJ1PywWnLawwxLi50CVTrOAGmw=", "presentation_definition": {"id": "mDL-request-demo", "input_descriptors": [{"id": "org.iso.18013.5.1.mDL", "format": {"mso_mdoc": {"alg": ["ES256"]}}, "constraints": {"limit_disclosure": "required", "fields": [{"path": ["$[\'org.iso.18013.5.1\'][\'family_name\']"], "intent_to_retain": false}, {"path": ["$[\'org.iso.18013.5.1\'][\'given_name\']"], "intent_to_retain": false}, {"path": ["$[\'org.iso.18013.5.1\'][\'age_over_21\']"], "intent_to_retain": false}]}}]}}',
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
      setRes(credentialResponse);
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
      <button onClick={handleTestRequest}>test it now</button>

      <br />
      <br />
      {error && <pre>{error}</pre>}
      {res && <pre>{JSON.stringify(res, null, 2)}</pre>}
    </div>
  );
}
