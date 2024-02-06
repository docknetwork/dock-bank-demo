import { apiPost } from "../action/api-post";
import { v4 as uuidv4 } from "uuid";

import { createBankIdCredential } from "../_credentials/quotient";
import { createCreditScoreCredential } from "../_credentials/equinet";
import { createBiometricsCredential } from "../_credentials/forsur";
import { toast } from "sonner";

const dockUrl = "https://api-testnet.dock.io";

async function encryptAndPrepareMessage(senderDID, receiverDID, credentialsSubject) {

  console.log("encryptAndPrepareMessage");

  const encryptionPayload = {
    senderDid: senderDID,
    recipientDids: [receiverDID],
    type: "issue",
    payload: {
      domain: "api.dock.io",
      credentials: credentialsSubject
    }
  };

  console.log("encryptionPayload:", encryptionPayload);

  const didcommMessage = await apiPost({
    url: `${dockUrl}/messaging/encrypt`,
    body: encryptionPayload
  });

  console.log("didComm Message:", didcommMessage);

  return didcommMessage.jwe;
}


const signedCredential = async (receiverDid) => {
  const enrollmentId = `${uuidv4()}`;;

  const bankIdData = {
    receiverDid: receiverDid,
    receiverName: "John Smith", //Name input
    receiverAddress: "123 Main St, Anytown, CA 90210",
    enrollmentId: enrollmentId
  };

  const biometricsData = {
    receiverDid: receiverDid,
    enrollmentId: enrollmentId,
    biometricData: "some_biometrics_data",
    enrollmentDate: "2024-02-05",
    validTo: "2024-03-05",
  };

  const creditScoreData = {
    receiverDid: receiverDid,
  };

  const bankIdCredential = createBankIdCredential(bankIdData);
  const creditScoreCredential = createCreditScoreCredential(creditScoreData)
  const biometricsCredential = createBiometricsCredential(biometricsData);

  const credentials = [
    bankIdCredential,
    creditScoreCredential,
    biometricsCredential
  ];

  const issuedCredentials = await Promise.all(credentials.map(async credential => {
    return apiPost({
      url: credential.url,
      body: credential.body
    });
  }));

  return issuedCredentials;
};

export const issueCredentials = async (
  receiverDID,
  setIsLoading,
) => {

  const responses = [];

  try {
    setIsLoading(true);

    const issuedCredentials = await signedCredential(receiverDID);

    const senderDIDMapping = [
      "did:dock:5HKkVpaciu1RArV13E7ig3i84JtiMTcwoXoHPZ8VMrBUYJ4w",
      "did:dock:5HLbQLSmirNuZVRsdWKbsgdajw9QTGzSFJABSVzMT5EBj5sb",
      "did:dock:5CKsfvaE68mvRhdn3dDXG4KpWzuvaUNdBbiu6sFUuPK9rw66"
    ];

    console.log("issuedCredentials: ", issuedCredentials);

    for (let i = 0; i < issuedCredentials.length; i++) {
      const issuedCredential = issuedCredentials[i];

      // Get the senderDID from the mapping using the index
      const senderDID = senderDIDMapping[i];

      console.log("Processing credential:", issuedCredential);

      console.log("Processing credential senderDID:", senderDID);

      const encryptedMessage = await encryptAndPrepareMessage(senderDID, receiverDID, [issuedCredential.credentialSubject]);

      console.log("encryptedMessage:", encryptedMessage);

      const sendMessagePayload = {
        to: receiverDID,
        message: encryptedMessage
      };

      const data = await apiPost({
        url: `${dockUrl}/messaging/send`,
        body: sendMessagePayload
      });


      console.log("apiPost data:", data);

      responses.push({
        sent: true,
        issuedCredential: issuedCredential
      });
    }
    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Credentials' }), 2000));

    toast.promise(promise, {
      loading: 'Loading...',
      success: (data) => {
        return `${data.name} has been issued`;
      },
      error: 'Error',
    });


  } catch (error) {

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";

    toast.error(`Error: ${errorMessage}`);

    responses.push({ sent: false, error: errorMessage });

  } finally {

    setIsLoading(false);
  }

  return responses;
};