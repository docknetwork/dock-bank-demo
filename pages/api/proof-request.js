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
  purpose: 'Customer Credential with name, issued date requested',
  constraints: {
    fields: [
      {
        path: [
          '$.credentialSubject.name',
          '$.issuanceDate'
        ]
      },
      {
        path: [
          '$.type[*]'
        ],
        filter: {
          type: 'string',
          pattern: 'CustomerCredential'
        }
      }
    ]
  }
};

const rewardsProgramDescriptor = {
  id: 'RewardsProgramProof',
  name: 'Rewards Program Request',
  purpose: 'Rewards Program with eligibility, issued date requested',
  constraints: {
    fields: [
      {
        path: [
          '$.issuanceDate'
        ]
      },
      {
        path: [
          '$.credentialSubject.eligibility'
        ],
        filter: {
          type: 'boolean',
          const: true
        }
      },
      {
        path: [
          '$.type[*]'
        ],
        filter: {
          type: 'string',
          pattern: 'RewardsProgram'
        }
      }
    ]
  }
};

const proofOfAddressDescriptor = {
  id: 'ProofOfAddressProof',
  name: 'Proof Of Address Proof Request',
  purpose: 'Proof Of Address with issued date requested',
  constraints: {
    fields: [
      {
        path: [
          '$.issuanceDate',
        ]
      },
      {
        path: [
          '$.type[*]'
        ],
        filter: {
          type: 'string',
          pattern: 'ProofOfAddress'
        }
      }
    ]
  }
};

const kycCredentialsDescriptor = {
  id: 'KYCCredentialsProof',
  name: 'KYC Credentials Proof Request',
  purpose: 'KYC Credentials with verifiedBy and issued date requested',
  constraints: {
    fields: [
      {
        path: [
          '$.issuanceDate',
          '$.credentialSubject.verifiedBy'
        ]
      },
      {
        path: [
          '$.type[*]'
        ],
        filter: {
          type: 'string',
          pattern: 'KYCCredentials'
        }
      }
    ]
  }
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
          '$.credentialSubject.routingNumber'
        ]
      },
      {
        path: [
          '$.type[*]'
        ],
        filter: {
          type: 'string',
          pattern: 'BankAccountDetails'
        }
      }
    ]
  }
};

const proofRequestTypes = {
  proofOfCustomer: {
    request: {
      input_descriptors: [
        customerCredentialDescriptor
      ]
    },
    name: 'Customer Proof Request',
  },
  proofForSignIn: {
    request: {
      submission_requirements: [{
        name: 'Sign In Informations',
        rule: 'all',
        from: 'A'
      }],
      input_descriptors: [
        {
          ...customerCredentialDescriptor,
          group: ['A'],
        },
        {
          ...rewardsProgramDescriptor,
          group: ['A'],
        },
        {
          ...proofOfAddressDescriptor,
          group: ['A'],
        },
        {
          ...kycCredentialsDescriptor,
          group: ['A'],
        },
        {
          ...bankAccountDetailsDescriptor,
          group: ['A'],
        },
      ]
    },
    name: 'Sign In Proof Request',
  },
  proofForRewards: {
    request: {
      submission_requirements: [{
        name: 'Reward Program Informations',
        rule: 'all',
        from: 'A'
      }],
      input_descriptors: [
        {
          ...customerCredentialDescriptor,
          group: ['A'],
        },
        {
          ...rewardsProgramDescriptor,
          group: ['A'],
        },
        {
          ...proofOfAddressDescriptor,
          group: ['A'],
        },
      ],
    },
    name: 'Reward Program Proof Request',
  },
  proofForCreditCard: {
    request: {
      submission_requirements: [{
        name: 'Credit Card Informations',
        rule: 'all',
        from: 'A'
      }],
      input_descriptors: [
        {
          ...customerCredentialDescriptor,
          group: ['A'],
        },
        {
          ...kycCredentialsDescriptor,
          group: ['A'],
        },
      ]
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
