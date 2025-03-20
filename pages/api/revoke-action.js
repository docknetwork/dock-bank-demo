import { dockUrl } from '../../utils/constants';

export default async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Only post request allowed');
    res.status(400).json({});
    return;
  }

  const body = { ...req.body };
  const result = await fetch(
    `${dockUrl}/credentials/${encodeURIComponent(body.credentialIds[0])}/${body.action === 'revoke' ? 'revoke' : 'unrevoke'}`,
    {
      method: 'POST',
      headers: {
        'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
        'content-type': 'application/json',
      },
    }
  );

  const response = await result.json();
  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API Error: ${result.status} - ${errorText}`);
  }

  res.status(202).send(response);
};
