import { postRequest } from "./request";
import { dockUrl } from "./constants";
/**
 * Creates a new registry by calling the Registries API endpoint.
 *
 * @param {string} policyDid - The DID of the policy to associate with the registry.
 * @param {string} type - The type of registry.
 * @returns {Promise<any>} A promise that resolves to the API response if successful, or rejects with an error.
 */
export async function createRegistry(policyDid, type) {
    const data = {
        addOnly: false,
        policy: [policyDid],
        type: type,
    };

    try {
        const response = await postRequest(
            `${dockUrl}/registries`,
            data,
        );

        console.log("Registries :", response);
        if (response.data) {
            return response.data
        } else {
            throw new Error('Data is not present on registries response')
        }

    } catch (error) {
        console.error(error);
    }

    return undefined;
}

/**
 * Revokes a credential from the registry with the given ID.
 *
 * @param {string} registryId - The ID of the registry to revoke from.
 * @param {Credential} credential - The credential object containing the ID to revoke.
 * @returns {Promise<any>} A promise that resolves to the API response if successful, or rejects with an error.
 */
export async function revoke(registryId, credential) {
    const url = `${dockUrl}/registries/${registryId}`;

    const data = {
        action: "revoke",
        credentialIds: [credential.id],
    };

    try {
        const response = await postRequest(
            url,
            data
        );

        return response;
    } catch (error) {
        console.error("revoke:error", error);
    }

    return undefined;
}

/**
 * Un-revokes a previously revoked credential from the registry with the given ID.
 *
 * @param {string} registryId - The ID of the registry to unrevoke from.
 * @param {Credential} credential - The credential object containing the ID to unrevoke.
 * @returns {Promise<any>} A promise that resolves to the API response if successful, or rejects with an error.
 */
export async function unrevoke(registryId, credential) {
    console.log("unrevoke:start:", { registryId, credential });

    const url = `registries/${registryId}`;

    const data = {
        action: "unrevoke",
        credentialIds: [credential.id],
    };

    try {
        const response = await postRequest({
            url: url,
            body: data,
        });

        return response;
    } catch (error) {
        console.error("unrevoke:error", error);
    }

    return undefined;
}
