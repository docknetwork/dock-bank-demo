export default async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Only post request allowed');
    res.status(400).json({});
    return;
  }

  const body = req.body;

  console.log('body::', body);

  const result = await fetch(body.url, {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'DOCK-API-KEY': process.env.DOCK_API_TOKEN,
    },
    body: JSON.stringify(body),
  });

  const response = await result.json();
  console.log('response:', result);

  if (!result.ok) {
    const errorText = await result.text();
    throw new Error(`API Error: ${result.status} - ${errorText}`);
  }

  res.status(202).send(response);
};
