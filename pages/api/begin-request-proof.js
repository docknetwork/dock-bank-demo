import { dockUrl } from '../../utils/constants';
import { generateNonce } from '../../utils/generate-nonce';

export default async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Only post request allowed');
    res.status(400).json({});
    return;
  }

  // Create proof request through the Truvera API
  let proofRequest;
  try {
    const result = await fetch(`${dockUrl}/proof-templates/${req.body.templateId}/request`, {
      method: 'POST',
      headers: {
        'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        did: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
        nonce: `${generateNonce()}`,
        domain: 'dock.io',
      }),
    });

    proofRequest = await result.json();
    if (!result.ok) {
      const errorText = await result.text();
      throw new Error(`API Error: ${result.status} - ${errorText}`);
    }
  } catch (e) {
    console.error(e);
  }

  // Get OID4VP QR code URL
  const result = await fetch(`${dockUrl}/openid/vp/${proofRequest.id}/request-url`, {
    method: 'POST',
    headers: {
      'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      withRequestURI: true,
    }),
  });

  const { url: qrUrl } = await result.json();
  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API Error: ${result.status} - ${errorText}`);
  }

  res.status(202).send({
    qrUrl,
    proofRequest,
  });
};
