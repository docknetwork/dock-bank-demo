import { postRequestLocal } from "./request";
/**
 * Creates a credential with the provided credential data and issuer.
 * Sets the credential issuer ID to the provided issuer DID.
 * Wraps the credential in an object and sends an POST request to credentials/ to store it.
 * @returns A Promise that resolves to the credential data.
 */
export async function createCredential(isRevocable, credential) {
    // Set the credential status to the registry ID.
    if (isRevocable) {
        credential.revocable = true;
    }

    console.log("issuing credential", credential);
    return postRequestLocal('issue-credential', credential);
}

/**
 * @name verifyCredential
 * @description Verifies a credential by sending it in a POST request to /verify/.
 *
 * @param credential - The credential to verify.
 * @returns A Promise that resolves to the verification result.
 */
export async function verifyCredential({ credential }) {
    console.log("verifying credential", credential);
    return postRequestLocal('verify-credential', credential);
}

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
