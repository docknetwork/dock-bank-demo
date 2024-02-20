import { createRegistry } from './dock-registries';
import { createCredential, distributeCredential } from './dock-credentials';
import { waitForJobCompletion } from './dock-jobs';

export const issueRevokableCredential = async (credential, setStorageRegistryId) => {

    const credentialPayload = credential;
    const _credential = credentialPayload.credential;
    console.log('_credential', _credential);
    const type = 'DockVBAccumulator2022';

    const registry = await createRegistry(_credential.issuer.id, type);

    await waitForJobCompletion(registry.id);

    const signed = await createCredential(registry.data.id, credentialPayload);
    console.log('credentialSignedMessage', { signed });

    const issuedCredential = await distributeCredential(signed.data);

    if (issuedCredential) {
        const credentialIssuedMessage = `Credential Issued to DID!, ${JSON.stringify(
            issuedCredential
        )}`;
        console.log(credentialIssuedMessage)
    }

    if (_credential.name === "ForSur - Biometric") {
        setStorageRegistryId(registry.data.id)
        console.log('setting RegistryId in cache');
    }
    return issuedCredential;
};

export const revokeCredential = async (registryId, credential) => {

    const payload = {
        "action": "revoke",
        "credentialIds": [
            credential.id
        ]
    }

    return await postRequest(
        `${dockUrl}/registries/${registryId}`,
        payload,
    );
};

export const unRevokeCredential = async (registryId, credential) => {
    // TODO UnRevoke Credential
    // TODO return Success!
};
