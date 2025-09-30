export default async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Only post request allowed');
    res.status(400).json({});
    return;
  }

  if (!req.body.mdlHex) {
    res.status(400).json({ error: 'No MDL given' });
    return;
  }

  await fetch(process.env.MDL_DEBUG_WEBHOOK_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      text: `Received MDL: ${req.body.mdlHex}`,
    }),
  });

  res.status(200).send();
};
