import { dockUrl } from '../../utils/constants';

export default async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Only post request allowed');
    res.status(400).json({});
    return;
  }

  const result = await fetch(`${dockUrl}/verify`, {
    method: 'POST',
    headers: {
      'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
      'content-type': 'application/json',
    },
    body: JSON.stringify(req.body),
  });

  const response = await result.json();
  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API Error: ${result.status} - ${errorText}`);
  }

  res.status(202).send(response);
};
