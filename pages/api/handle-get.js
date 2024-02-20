export default async (req, res) => {
    if (req.method !== 'GET') {
        console.log('Only GET request allowed');
        res.status(400).json({});
        return;
    }

    const url = req.query.url;

    const result = await fetch(url, {
        method: 'GET',
        headers: {
            'DOCK-API-TOKEN': `${process.env.DOCK_API_TOKEN}`,
            'content-type': 'application/json',
        },
    });

    const response = await result.json();
    console.log('response:', result);

    if (!result.ok) {
        const errorText = await result.text();
        throw new Error(`API get Error: ${result.status} - ${errorText}`);
    }

    res.status(202).send(response);
};
