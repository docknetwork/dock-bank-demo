import { v4 as uuidv4 } from "uuid";
import { dockUrl } from "utils/constants";

export function createBiometricsCredential({
  receiverDid,
  enrollmentId,
  biometricData,
}
) {

  console.log("Creating ForSur - Biometric Enrollment Credential for:", receiverDid);

  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: true,
      persist: true,
      password: "1234",
      distribute: true,
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "ForSur - Biometric",
        description: "The \"ForSur - Biometric\" schema is specifically developed for the secure registration and storage of biometric data.",
        type: [
          "VerifiableCredential",
          "ForSurBiometric"
        ],
        issuer: {
          name: "Forsur",
          description: "Forsur is the biometric provider.",
          logo: "https://img.dock.io/80f154126a78bba321b413c3ffb8d4a7",
          id: process.env.NEXT_PUBLIC_FORSUR_ISSUER_ID
        },
        subject: {
          id: receiverDid,
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