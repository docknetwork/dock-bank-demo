import { v4 as uuidv4 } from "uuid";

export function createBankIdCredential({
  receiverDid,
  receiverName,
  receiverAddress,
  enrollmentId
}) {
  const dockUrl = "https://api-testnet.dock.io";

  console.log("Creating Quotient Bank Identity Credential for:", receiverDid);

  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: true,
      persist: true,
      password: "1234",
      distribute: true,
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Quotient - Bank Identity W/ Biometrics",
        description: "The \"Quotient - Bank Identity\" schema provides a secure and standardized format for representing key aspects of an individual's bank identity.",
        type: [
          "VerifiableCredential",
          "QuotientBankIdentityWBiometrics"
        ],
        issuer: {
          name: "Quotient Credit Union",
          description: "Quotient is our credit union",
          logo: "https://img.dock.io/06d78272268c606a172d5fd1cd559b46",
          id: "did:dock:5HKkVpaciu1RArV13E7ig3i84JtiMTcwoXoHPZ8VMrBUYJ4w"
        },
        credentialSubject: {
          id: receiverDid,
          name: receiverName,
          address: receiverAddress,
          account_number: `ABC${uuidv4()}`,
          biometric_enrollment_id: enrollmentId,
        }
      }
    }
  };
}