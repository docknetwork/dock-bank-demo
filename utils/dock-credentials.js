import { postRequest } from "./request";
import { dockUrl } from "./constants";
/**
 * Creates a credential with the provided credential data and issuer.
 * Sets the credential issuer ID to the provided issuer DID.
 * Wraps the credential in an object and sends an POST request to credentials/ to store it.
 * @returns A Promise that resolves to the credential data.
 */
export async function createCredential(registryId, credential) {
    // Set the credential status to the registry ID.
    credential.credential.status = registryId;

    return await postRequest(
        `${dockUrl}/credentials/`,
        credential,
    );
}

/**
 * @name verifyCredential
 * @description Verifies a credential by sending it in a POST request to /verify/.
 *
 * @param credential - The credential to verify.
 * @returns A Promise that resolves to the verification result.
 */
export async function verifyCredential({ credential }) {

    return await postRequest(
        `${dockUrl}/verify/`,
        credential,
    );
}

/**
 * Distributes a credential by encrypting it and sending it via API.
 * 
 * @param credential - The credential to be distributed.
 * @returns A Promise that resolves to the result of the API call.
 */
export async function distributeCredential(credential) {

    console.log('distributeCredential:', credential);
    const encryptionPayload = {
        senderDid: credential.issuer.id,
        recipientDids: [credential.credentialSubject.id],
        type: "issue",
        payload: {
            domain: "api.dock.io",
            credentials: [credential.subject],
        }
    };

    return await postRequest(
        `${dockUrl}/messaging/encrypt`,
        encryptionPayload
    );
};

// export async function requestClaims(credential) {

//     const body = {
//         "schema": "https://schema.dock.io/ForSurBiometricEnrollment-V3-1707313346922.json",
//         "claims": [
//             1
//         ],
//         "credentialOptions": {
//             credential: credential,
//         }
//     };

//     return await postRequest(
//         `${dockUrl}/credentials/request-claims/`,
//         body
//     );
// }