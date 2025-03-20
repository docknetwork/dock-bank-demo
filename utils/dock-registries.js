import { toast } from 'sonner';
import { postRequestLocal } from './request';

/**
 * Revokes a credential from the registry with the given ID.
 *
 * @param {Credential} credential - The credential object containing the ID to revoke.
 * @returns {Promise<any>} A promise that resolves to the API response if successful, or rejects with an error.
 */

export const revokeCredential = async (credentialId) => {
    const payload = {
        action: 'revoke',
        credentialIds: [
            credentialId
        ]
    };

    try {
        return await postRequestLocal(
            'revoke-action',
            payload,
        );
    } catch (error) {
        toast.warning('Error revoking this credential');
    }
};

/**
 * Un-revokes a previously revoked credential from the registry with the given ID.
 *
 * @param {Credential} credential - The credential object containing the ID to unrevoke.
 * @returns {Promise<any>} A promise that resolves to the API response if successful, or rejects with an error.
 */
export async function unrevoke(credential) {
    console.log('unrevoke:start:', { credential });

    const data = {
        action: 'unrevoke',
        credentialIds: [credential.id],
    };

    try {
        const response = await postRequestLocal(
            'revoke-action',
            data,
        );

        return response;
    } catch (error) {
        console.error('unrevoke:error', error);
    }

    return undefined;
}
