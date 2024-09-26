import { validateEmail } from 'utils/validation';

export function createCreditScoreCredential({ receiverDid, recipientEmail, creditScore }) {
  console.log('Creating EquiNet - Credit Score Credential for:', receiverDid);

  const credentialPayload = {
    body: {
      anchor: false,
      distribute: true,
      algorithm: 'bbdt16',
      credential: {
        name: 'EquiNet - Credit Score',
        schema: 'https://schema.dock.io/EquiNetCreditScore-V2-1706975901761.json',
        description: 'This schema represents a Verified Credit Score Credential, issued by EquiNet. It standardizes the presentation of credit scores for reliable and efficient verification processes.',
        type: [
          'VerifiableCredential',
          'EquiNetCreditScore'
        ],
        issuer: {
          name: 'EquiNET',
          description: 'EquiNet is the credit bureau.',
          logo: 'https://img.dock.io/9f327cafda3be5f0cff0da2df44c55da',
          id: process.env.NEXT_PUBLIC_EQUINET_ISSUER_ID
        },
        subject: {
          id: receiverDid,
          credit_score: creditScore,
        }
      }
    }
  };

  if (recipientEmail && recipientEmail.length > 2 && validateEmail(recipientEmail)) {
    credentialPayload.recipientEmail = recipientEmail;
  }

  return credentialPayload;
}
