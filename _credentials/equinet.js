
import { v4 as uuidv4 } from "uuid";
import { getRandomNumber } from "utils";

export function createCreditScoreCredential({ receiverDid }) {
  const dockUrl = "https://api-testnet.dock.io";

  console.log("Creating EquiNet - Credit Score Credential for:", receiverDid);

  return {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: true,
      persist: true,
      password: "1234",
      distribute: true,
      credential: {
        id: `https://creds-testnet.dock.io/${uuidv4()}`,
        name: "EquiNet - Credit Score",
        description: "This schema represents a Verified Credit Score Credential, issued by EquiNet. It standardizes the presentation of credit scores for reliable and efficient verification processes.",
        type: [
          "VerifiableCredential",
          "EquiNetCreditScore"
        ],
        issuer: {
          name: "EquiNET",
          description: "EquiNet is the credit bureau.",
          logo: "https://img.dock.io/9f327cafda3be5f0cff0da2df44c55da",
          id: "did:dock:5CKsfvaE68mvRhdn3dDXG4KpWzuvaUNdBbiu6sFUuPK9rw66"
        },
        credentialSubject: {
          id: receiverDid,
          credit_score: getRandomNumber(750, 850),
        }
      }
    }
  };
}