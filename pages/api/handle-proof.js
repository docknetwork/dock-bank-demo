import { dockUrl } from 'utils/constants';

export default async (req, res) => {
  if (req.method !== 'GET') {
    console.log('Only GET request allowed');
    res.status(400).json({});
    return;
  }

  const PROOF_ID = req.query.proofID;

  const result = await fetch(`${dockUrl}/proof-requests/${PROOF_ID}`, {
    method: 'GET',
    headers: {
      'DOCK-API-TOKEN': `${process.env.NEXT_PUBLIC_DOCK_API_TOKEN}`,
      'content-type': 'application/json',
    },
  });

  const response = await result.json();
  console.log('response:', result);

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API Error: ${result.status} - ${errorText}`);
  }

  res.status(202).send(response);
};
