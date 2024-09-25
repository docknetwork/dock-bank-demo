import { dockUrl } from '../../utils/constants';

export default async (req, res) => {
  if (req.method !== 'GET') {
    console.log('Only GET request allowed');
    res.status(400).json({});
    return;
  }

  const result = await fetch(
    `${dockUrl}/registries?did=${encodeURIComponent(req.query.did)}&type=${encodeURIComponent(req.query.searchType)}`,
    {
      method: 'GET',
      headers: {
        'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
        'content-type': 'application/json',
      },
    }
  );

  const response = await result.json();

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API get Error: ${result.status} - ${errorText}`);
  }

  res.status(202).send(response);
};
