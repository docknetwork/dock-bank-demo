import { v4 as uuidv4 } from "uuid";
import { getRandomNumber } from "utils";
import { dockUrl } from "utils/constants";
import { validateEmail } from "utils/validation";

export function createCreditScoreCredential({ receiverDid, recipientEmail }) {

  console.log("Creating EquiNet - Credit Score Credential for:", receiverDid);

  const credentialPayload = {
    url: `${dockUrl}/credentials`,
    body: {
      anchor: false,
      distribute: true,
      algorithm: "dockbbs+",
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
          id: process.env.NEXT_PUBLIC_EQUINET_ISSUER_ID
        },
        subject: {
          id: receiverDid,
          credit_score: getRandomNumber(700, 800),
        }
      }
    }
  }

  if (recipientEmail && recipientEmail.length > 2 && validateEmail(recipientEmail)) {
    credentialPayload.recipientEmail = recipientEmail
  }

  return credentialPayload;
}