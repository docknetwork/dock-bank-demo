
import { v4 as uuidv4 } from "uuid";

export function createBiometricsCredential({
  receiverDid,
  enrollmentId,
  biometricData,
  enrollmentDate,
  validTo
}
) {
  const dockUrl = "https://api-testnet.dock.io";

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
        name: "ForSur - Biometric Enrollment",
        description: "The \"ForSur - Biometric Enrollment\" schema is specifically developed for the secure registration and storage of biometric data.",
        type: [
          "VerifiableCredential",
          "ForSurBiometricEnrollment"
        ],
        issuer: {
          name: "Forsur",
          description: "Forsur is the biometric provider.",
          logo: "https://img.dock.io/80f154126a78bba321b413c3ffb8d4a7",
          id: "did:dock:5HLbQLSmirNuZVRsdWKbsgdajw9QTGzSFJABSVzMT5EBj5sb"
        },
        subject: {
          id: receiverDid,
          valid_to: validTo,
          enrollment_id: enrollmentId,
          biometric_Data: biometricData,
          enrollment_date: enrollmentDate
        }
      }
    }
  };
}