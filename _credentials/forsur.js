import { v4 as uuidv4 } from 'uuid';
import { validateEmail } from 'utils/validation';

export function createBiometricsCredential({
  receiverDid,
  recipientEmail
}
) {
  console.log('Creating ForSur - Biometric Enrollment Credential for:', receiverDid);

  const credentialPayload = {
    body: {
      anchor: false,
      algorithm: 'bbdt16',
      distribute: true,
      credential: {
        schema: 'https://schema.dock.io/ForSurBiometricCheck-V4-1709846734949.json',
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: 'ForSur - Biometric',
        description: 'The "ForSur - Biometric" schema is specifically developed for the secure registration and storage of biometric data.',
        type: [
          'VerifiableCredential',
          'ForSurBiometric'
        ],
        issuer: {
          name: 'Forsur',
          description: 'Forsur is the biometric provider.',
          logo: 'https://img.dock.io/80f154126a78bba321b413c3ffb8d4a7',
          id: process.env.NEXT_PUBLIC_FORSUR_ISSUER_ID
        },
        subject: {
          id: receiverDid,
          biometric: {
            id: uuidv4(),
            created: new Date().toISOString(),
            data: 'some biometric data',
          }
        }
      }
    }
  };

  if (recipientEmail && recipientEmail.length > 2 && validateEmail(recipientEmail)) {
    credentialPayload.recipientEmail = recipientEmail;
  }

  return credentialPayload;
}
