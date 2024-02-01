import axios from 'axios';

import { informations } from 'utils';

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
        name: informations.name,
        email: informations.email,
        dateOfBirth: informations.dateOfBirth,
        phone: informations.phone,
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
      issuanceDate: '2023-01-01T14:15:22Z',
    };
  },
  rewardsProgram({ holderDID }) {
    return {
      name: 'Rewards Elegibility',
      type: ['VerifiableCredential', 'RewardsProgram'],
      issuer: issuerDID,
      subject: {
        id: holderDID,
        eligibility: true,
        rewardId: informations.rewardId,
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
        address: informations.address,
      },
      issuanceDate: '2021-01-01T14:15:22Z',
    };
  },
};

export default async (req, res) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.status(400).json({});
    return;
  }

  const { holderDID, recipientEmail } = req.query;

  if (!holderDID && !recipientEmail) {
    res.status(400).json({});
    return;
  }

  try {
    const credentials = await Promise.all(
      Object.keys(credentialTypes).map(async (type) => {
        const credFn = credentialTypes[type];
        const credentialData = credFn({ holderDID });

        const { data: credentialsResponse } = await axios.post(
          `${baseUrl}/credentials`,
          {
            anchor: false,
            persist: false,
            credential: credentialData,
            distribute: true,
            recipientEmail,
          },
          axiosHeaders
        );

        return credentialsResponse;
      })
    );

    res.json(credentials);
  } catch (e) {
    console.error(e);
    res.status(400).json({ error: e.message });
  }
};
