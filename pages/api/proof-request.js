import axios from 'axios';

const axiosHeaders = {
  headers: {
    'DOCK-API-TOKEN': process.env.DOCK_API_TOKEN,
  },
};

const baseUrl = process.env.DOCK_API_URL;

const proofRequestTypes = {
  proofOfCustomer: {
    request: {
      input_descriptors: [
        {
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
        }
      ]
    },
    name: 'Customer Proof Request',
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
          id: 'CustomerCredentialProof',
          name: 'Customer Proof Request',
          group: ['A'],
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
        },
        {
          id: 'RewardsProgramProof',
          name: 'Rewards Program Request',
          group: ['A'],
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
        },
        {
          id: 'ProofOfAddressProof',
          name: 'Proof Of Address Proof Request',
          group: ['A'],
          purpose: 'Proof Of Address with issued date requested',
          constraints: {
            fields: [
              {
                path: [
                  '$.issuanceDate'
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
        },
      ]
    },
    name: 'Reward Program Proof Request',
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
