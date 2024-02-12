import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { createBankIdCredential } from '../_credentials/quotient';
import { createCreditScoreCredential } from '../_credentials/equinet';
import { createBiometricsCredential } from '../_credentials/forsur';
import { postRequest } from './request';
import { dockUrl } from './constants';

async function encryptAndPrepareMessage(senderDID, receiverDID, credentialsSubject) {
  console.log('encryptAndPrepareMessage');

  const encryptionPayload = {
    senderDid: senderDID,
    recipientDids: [receiverDID],
    type: 'issue',
    payload: {
      domain: 'api.dock.io',
      credentials: credentialsSubject
    }
  };

  console.log('encryptionPayload:', encryptionPayload);

  const data = await postRequest(`${dockUrl}/messaging/encrypt`, encryptionPayload);

  console.log('didComm Message:', data);

  return data.data.jwe;
}

const signedCredential = async (receiverDid) => {
  const enrollmentId = `${uuidv4()}`;

  const bankIdData = {
    receiverDid,
    receiverName: 'John Smith', // Name input
    receiverAddress: '123 Main St, Anytown, CA 90210',
    enrollmentId
  };

  const biometricsData = {
    receiverDid,
    enrollmentId,
    biometricData: 'some_biometrics_data',
    enrollmentDate: '2024-02-05',
    validTo: '2024-03-05',
  };

  const creditScoreData = {
    receiverDid,
  };

  const bankIdCredential = createBankIdCredential(bankIdData);
  const creditScoreCredential = createCreditScoreCredential(creditScoreData);
  const biometricsCredential = createBiometricsCredential(biometricsData);

  const credentials = [
    bankIdCredential,
    creditScoreCredential,
    biometricsCredential
  ];

  const issuedCredentials = await Promise.all(credentials.map(async (credential) => {
    const credentialData = await postRequest(credential.url, credential.body);
    return credentialData.data;
  }));

  return issuedCredentials;
};

export const issueCredentials = async (
  receiverDID,
  setIsLoading,
  setIsSuccess
) => {
  const responses = [];

  try {
    const issuedCredentials = await signedCredential(receiverDID);

    const senderDIDMapping = [
      process.env.NEXT_PUBLIC_QUOTIENT_ISSUER_ID,
      process.env.NEXT_PUBLIC_FORSUR_ISSUER_ID,
      process.env.NEXT_PUBLIC_EQUINET_ISSUER_ID
    ];

    console.log('senderDIDMapping:', senderDIDMapping);

    console.log('issuedCredentials: ', issuedCredentials);

    for (let i = 0; i < issuedCredentials.length; i++) {
      const issuedCredential = issuedCredentials[i];

      // Get the senderDID from the mapping using the index
      const senderDID = senderDIDMapping[i];

      console.log('Processing credential:', issuedCredential);

      console.log('Processing credential senderDID:', senderDID);

      const encryptedMessage = await encryptAndPrepareMessage(senderDID, receiverDID, [issuedCredential.credentialSubject]);

      console.log('encryptedMessage:', encryptedMessage);

      const sendMessagePayload = {
        to: receiverDID,
        message: encryptedMessage
      };

      const data = await postRequest(`${dockUrl}/messaging/send`, sendMessagePayload);

      console.log('Data messaging send :', data);

      responses.push({
        sent: true,
        issuedCredential
      });
    }
    const promise = () => new Promise((resolve) => setTimeout(() => resolve({ name: 'Credentials' }), 2000));

    toast.promise(promise, {
      success: (data) => `${data.name} has been issued`,
      error: 'Error',
    });

    setIsSuccess(true);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';

    toast.error(`Error: ${errorMessage}`);

    responses.push({ sent: false, error: errorMessage });
  } finally {
    setIsLoading(false);
  }

  return responses;
};
