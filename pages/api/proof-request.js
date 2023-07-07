import axios from 'axios';

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
  },
};

const baseUrl = process.env.DOCK_API_URL;

const customerCredentialDescriptor = {
  id: 'CustomerCredentialProof',
  name: 'Customer Proof Request',
  purpose: 'Customer Credential with name, email, dateOfBirth, phone and issuanceDate requested',
  constraints: {
    fields: [
      {
        path: [
          '$.credentialSubject.name',
          '$.credentialSubject.email',
          '$.credentialSubject.dateOfBirth',
          '$.credentialSubject.phone',
          '$.issuanceDate'
        ],
      },
      {
        path: ['$.type[*]'],
        filter: {
          type: 'string',
          const: 'CustomerCredential',
        },
      },
    ],
  },
};

const rewardsProgramDescriptor = {
  id: 'RewardsProgramProof',
  name: 'Rewards Program Request',
  purpose: 'Rewards Program with rewardId, eligibility and issued date requested',
  constraints: {
    fields: [
      {
        path: [
          '$.issuanceDate',
          '$.credentialSubject.rewardId',
          '$.credentialSubject.eligibility',
        ],
      },
      {
        path: ['$.type[*]'],
        filter: {
          type: 'string',
          pattern: 'RewardsProgram',
        },
      },
    ],
  },
};

const proofOfAddressDescriptor = {
  id: 'ProofOfAddressProof',
  name: 'Proof Of Address Proof Request',
  purpose: 'Proof Of Address with address and issued date requested',
  constraints: {
    fields: [
      {
        path: ['$.issuanceDate', '$.credentialSubject.address'],
      },
      {
        path: ['$.type[*]'],
        filter: {
          type: 'string',
          const: 'ProofOfAddress',
        },
      },
    ],
  },
};

const kycCredentialDescriptor = {
  id: 'KYCCredentialProof',
  name: 'KYC Credential Proof Request',
  purpose: 'KYC Credential with verifiedBy and issued date requested',
  constraints: {
    fields: [
      {
        path: ['$.issuanceDate', '$.credentialSubject.verifiedBy'],
      },
      {
        path: ['$.type[*]'],
        filter: {
          type: 'string',
          const: 'KYCCredential',
        },
      },
    ],
  },
};

const bankAccountDetailsDescriptor = {
  id: 'BankAccountDetailsProof',
  name: 'Bank Account Details Proof Request',
  purpose: 'Bank Account Details with checkingAccount, routingNumber and issued date requested',
  constraints: {
    fields: [
      {
        path: [
          '$.issuanceDate',
          '$.credentialSubject.checkingAccount',
          '$.credentialSubject.routingNumber',
        ],
      },
      {
        path: ['$.type[*]'],
        filter: {
          type: 'string',
          const: 'BankAccountDetails',
        },
      },
    ],
  },
};

const proofRequestTypes = {
  proofOfCustomer: {
    request: {
      input_descriptors: [customerCredentialDescriptor],
    },
    name: 'Customer Proof Request',
  },
  proofForSignIn: {
    request: {
      submission_requirements: [
        {
          name: 'Customer Credential Informations',
          rule: 'pick',
          count: 1,
          from: 'A',
        },
        {
          name: 'Reward Program Informations',
          rule: 'pick',
          count: 1,
          from: 'B',
        },
        {
          name: 'Proof of Address Informations',
          rule: 'pick',
          count: 1,
          from: 'C',
        },
        {
          name: 'KYC Credential Informations',
          rule: 'pick',
          from: 'D',
          count: 1,
        },
        {
          name: 'Bank Account Details Informations',
          rule: 'pick',
          from: 'E',
          count: 1,
        },
      ],
      input_descriptors: [
        {
          ...customerCredentialDescriptor,
          group: ['A'],
        },
        {
          ...rewardsProgramDescriptor,
          group: ['B'],
        },
        {
          ...proofOfAddressDescriptor,
          group: ['C'],
        },
        {
          ...kycCredentialDescriptor,
          group: ['D'],
        },
        {
          ...bankAccountDetailsDescriptor,
          group: ['E'],
        },
      ],
    },
    name: 'Sign In Proof Request',
  },
  proofForRewards: {
    request: {
      submission_requirements: [
        {
          name: 'Customer Credential Informations',
          rule: 'pick',
          count: 1,
          from: 'A',
        },
        {
          name: 'Reward Program Informations',
          rule: 'pick',
          count: 1,
          from: 'B',
        },
        {
          name: 'Proof of Address Informations',
          rule: 'pick',
          count: 1,
          from: 'C',
        },
      ],
      input_descriptors: [
        {
          ...customerCredentialDescriptor,
          group: ['A'],
        },
        {
          ...rewardsProgramDescriptor,
          group: ['B'],
        },
        {
          ...proofOfAddressDescriptor,
          group: ['C'],
        },
      ],
    },
    name: 'Reward Program Proof Request',
  },
  proofForCreditCard: {
    request: {
      submission_requirements: [
        {
          name: 'Customer Credential Informations',
          rule: 'pick',
          from: 'A',
          count: 1,
        },
        {
          name: 'KYC Credential Informations',
          rule: 'pick',
          from: 'B',
          count: 1,
        },
        {
          name: 'Proof of Address Informations',
          rule: 'pick',
          count: 1,
          from: 'C',
        },
      ],
      input_descriptors: [
        {
          ...customerCredentialDescriptor,
          group: ['A'],
        },
        {
          ...kycCredentialDescriptor,
          group: ['B'],
        },
        {
          ...proofOfAddressDescriptor,
          group: ['C'],
        },
      ],
    },
    name: 'Credit Card Proof Request',
  },
};

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.status(200).json({});

    return;
  }

  // Checking existing proof request
  if (req.query.id) {
    try {
      const result = await axios.get(`${baseUrl}/proof-requests/${req.query.id}`, axiosHeaders);
      res.json(result.data);

      return;
    } catch (e) {
      res.status(400).json({ error: e.message });
      return;
    }
  }

  // Create new proof request
  const requestType = proofRequestTypes[req.query.type];
  if (!requestType) {
    res.status(400).json({ error: 'Invalid proof request type' });

    return;
  }

  try {
    const result = await axios.post(`${baseUrl}/proof-requests`, requestType, axiosHeaders);
    res.json(result.data);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};
