import { v4 as uuidv4 } from 'uuid';
import { validateEmail } from 'utils/validation';

export function createBankIdCredential({
  receiverDid,
  recipientEmail,
  receiverName,
  receiverAddress,
  biometricData
}) {
  console.log('Creating Quotient Bank Identity Credential for:', receiverDid);

  const credentialPayload = {
    body: {
      anchor: false,
      algorithm: 'bbdt16',
      distribute: true,
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        schema: 'https://schema.truvera.io/QuotientBankIdentity-V4-1747932534547.json',
        name: 'Quotient - Bank Identity',
        description: "The \"Quotient - Bank Identity\" schema provides a secure and standardized format for representing key aspects of an individual's bank identity.",
        type: [
          'VerifiableCredential',
          'QuotientBankIdentity'
        ],
        issuer: {
          name: 'Quotient Credit Union',
          description: 'Quotient is our credit union',
          logo: 'https://img.dock.io/06d78272268c606a172d5fd1cd559b46',
          id: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID
        },
        subject: {
          id: receiverDid,
          name: receiverName,
          address: receiverAddress.address,
          city: receiverAddress.city,
          zip: receiverAddress.zip,
          state: receiverAddress.state,
          account_number: `ABC${uuidv4()}`,
          biometric: biometricData
        }
      }
    }
  };

  if (recipientEmail && recipientEmail.length > 2 && validateEmail(recipientEmail)) {
    credentialPayload.recipientEmail = recipientEmail;
  }

  return credentialPayload;
}
