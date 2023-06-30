import axios from 'axios';

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
  },
};

const baseUrl = process.env.DOCK_API_URL;
const issuerDID = process.env.DOCK_API_DID;

const credentialTypes = {
  customerCredential({ holderDID }) {
    return {
      name: 'Customer Credential',
      type: ['VerifiableCredential', 'CustomerCredential'],
      issuer: issuerDID,
      subject: {
        id: holderDID,
        name: 'Alice Doe',
      },
    };
  },
  bankAccountDetails({ holderDID }) {
    return {
      name: 'Bank Account Details',
      type: ['VerifiableCredential', 'BankAccountDetails'],
      issuer: issuerDID,
      subject: {
        id: holderDID,
        checkingAccount: '**1234',
        routingNumber: '123456789',
      },
    };
  },
  kycCredentials({ holderDID }) {
    return {
      name: 'KYC Credentials',
      type: ['VerifiableCredential', 'KYCCredential'],
      issuer: issuerDID,
      subject: {
        id: holderDID,
        verifiedBy: 'IDV Provider',
      },
      issuanceDate: '2023-01-01T14:15:22Z'
    };
  },
  rewardsProgram({ holderDID }) {
    return {
      name: 'Rewards Program',
      type: ['VerifiableCredential', 'RewardsProgram'],
      issuer: issuerDID,
      subject: {
        id: holderDID,
        eligibility: true,
      },
    };
  },
  proofOfAddress({ holderDID }) {
    return {
      name: 'Proof of Address',
      type: ['VerifiableCredential', 'ProofOfAddress'],
      issuer: issuerDID,
      subject: {
        id: holderDID,
        address: '123 Main St',
      },
      issuanceDate: '2021-01-01T14:15:22Z'
    };
  },
};

export default async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(400).json({});
    return;
  }

  const { holderDID } = req.query;

  if (!holderDID) {
    res.status(400).json({});
    return;
  }

  try {
    const credentials = await Promise.all(Object.keys(credentialTypes).map(async (type) => {
      const credFn = credentialTypes[type];
      const credentialData = credFn({ holderDID });

      const { data: credentialsResponse } = await axios.post(
        `${baseUrl}/credentials`,
        {
          anchor: false,
          persist: false,
          credential: credentialData,
          distribute: true,
        },
        axiosHeaders
      );

      return credentialsResponse;
    }));

    res.json(credentials);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};
