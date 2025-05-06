import { v4 as uuidv4 } from 'uuid';

const trustxTenant = process.env.TRUSTX_TENANT;
const trustxApiKey = process.env.TRUSTX_API_KEY;
const processDefnName = process.env.TRUSTX_PROCESS_DEFN_NAME;
const processDefnVersion = process.env.TRUSTX_PROCESS_DEFN_VERSION;
const baseURL = `https://${trustxTenant}.oak.trustx.com`;

export default async (req, res) => {
  if (req.method !== 'POST') {
    console.log('Only post request allowed');
    res.status(400).json({ error: 'Method not allowed' });
    return;
  }

  const { dock_wallet_id, biometric_enrollment_id } = req.body;

  if (!dock_wallet_id) {
    res.status(400).json({ error: 'dock_wallet_id is required' });
    return;
  }

  try {
    // Get the authentication token
    const authResponse = await fetch(`${baseURL}/api/arthr/apiKeys/issue`, {
      method: 'POST',
      headers: {
        'X-API-Key': trustxApiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!authResponse.ok) {
      const errorText = await authResponse.text();
      throw new Error(`TrustX Auth Error: ${authResponse.status} - ${errorText}`);
    }

    const authData = await authResponse.json();

    const processTokenName = `PM_${trustxTenant}_${uuidv4()}`;

    // Create process token using the authentication token
    const processTokenResponse = await fetch(`${baseURL}/api/process-manager/processTokens`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authData.token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: processTokenName,
        type: 'MULTI_USE_COUNT_LIMITED',
        status: 'ACTIVE',
        maxCount: 1,
        uiUrl: `${baseURL}/web/trustweb`,
        processDefnName,
        processDefnVersion: parseInt(processDefnVersion, 10),
        parameters: {
          dock_wallet_id,
          ...(biometric_enrollment_id && { biometric_enrollment_id }),
        },
      }),
    });

    if (!processTokenResponse.ok) {
      const errorText = await processTokenResponse.text();
      throw new Error(`TrustX Process Token Error: ${processTokenResponse.status} - ${errorText}`);
    }

    const processTokenData = await processTokenResponse.json();
    res.status(200).json({
      uiUrl: `${processTokenData.uiUrl}?pt=${processTokenData.id}`,
    });
  } catch (error) {
    console.error('Error in create-trustx-process-token:', error);
    res.status(500).json({ error: error.message });
  }
};
