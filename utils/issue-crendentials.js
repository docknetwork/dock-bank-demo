import { createRegistry } from './dock-registries';
import { createCredential, distributeCredential } from './dock-credentials';
import { waitForJobCompletion } from './dock-jobs';
import { toast } from 'sonner';

export const issueRevokableCredential = async (credential, setRevokableCredential) => {

    const credentialPayload = credential;
    const _credential = credentialPayload.credential;
    const type = 'DockVBAccumulator2022';
    //CREATING REGISTRY
    const registry = await createRegistry(_credential.issuer.id, type);
    //WAITING FOR REGISTRY JOB CONFIRMATION
    await waitForJobCompletion(registry.id);
    //SIGNING CREDENTIAL
    const signed = await createCredential(registry.data.id, credentialPayload);

    const issuedCredential = await distributeCredential(signed.data);

    if (_credential.name === "EquiNet - Credit Score") {
        setRevokableCredential({
            registryId: registry.data.id,
            credentialId: _credential.id
        });
        console.log('setting Revokable credential set in localStorage');
    }

    toast.success(`Issued ${_credential.name} crendential`, { duration: 10000 })
    return issuedCredential;
};

export const revokeCredential = async (registryId, credentialId) => {

    const payload = {
        "action": "revoke",
        "credentialIds": [
            credentialId
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
