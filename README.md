# Dock Bank Demo App

This is a demo application showing some real use cases of [Dock API](https://docs.api.dock.io) for credential issuance and verification.

## Getting Started

First, setup a .env file in the project's root folder

```bash
DOCK_API_URL=https://api-testnet.dock.io
NEXT_PUBLIC_DOCK_API_TOKEN=  # you can generate a key at https://certs.dock.io/keys
DOCK_API_DID= # the DID to use for the issuer. You can generate one here: https://certs.dock.io/dids
NEXT_PUBLIC_SERVER_URL= # the URL where this app is listening (e.g. http://192.168.0.100:3000 or http://localhost:3000)
```

Then, run the development server:

```bash
npm run dev -- -H IP_OR_HOSTNAME_WHERE_APP_IS_RUNNING
# or
yarn dev -- -H IP_OR_HOSTNAME_WHERE_APP_IS_RUNNING
```

The `-- -H [IP]` option above is needed to allow scanning of the credentials and presentations to work in your wallet app.

Open [NEXT_PUBLIC_SERVER_URL] with your browser to see the app.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
