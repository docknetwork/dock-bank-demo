import { v4 as uuidv4 } from "uuid";
import { dockUrl } from "utils/constants";

export function createBankIdCredential({
  receiverDid,
  receiverName,
  receiverAddress,
  enrollmentId,
  biometricData
}) {

  console.log("Creating Quotient Bank Identity Credential for:", receiverDid);

  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: false,
      distribute: true,
      algorithm: "dockbbs+",
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "Quotient - Bank Identity",
        description: "The \"Quotient - Bank Identity\" schema provides a secure and standardized format for representing key aspects of an individual's bank identity.",
        type: [
          "VerifiableCredential",
          "QuotientBankIdentity"
        ],
        issuer: {
          name: "Quotient Credit Union",
          description: "Quotient is our credit union",
          logo: "https://img.dock.io/06d78272268c606a172d5fd1cd559b46",
          id: process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID
        },
        subject: {
          id: receiverDid,
          name: receiverName,
          address: receiverAddress,
          account_number: `ABC${uuidv4()}`,
          biometric: {
            id: enrollmentId,
            created: new Date().toISOString(),
            data: biometricData,
          }
        }
      }
    }
  };
}