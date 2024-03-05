import { toast } from 'sonner';
import { createRegistry } from './dock-registries';
import { createCredential } from './dock-credentials';
import { waitForJobCompletion } from './dock-jobs';

export const issueRevokableCredential = async (credential, setRevokableCredential, isRevocable) => {
    const credentialPayload = credential;
    const _credential = credentialPayload.credential;

    let registry = null;
    if (isRevocable) {
        const type = credentialPayload.algorithm === 'dockbbs+' ? 'DockVBAccumulator2022' : 'StatusList2021Entry';
        // CREATING REGISTRY
        registry = await createRegistry(_credential.issuer.id, type);
        // WAITING FOR REGISTRY JOB CONFIRMATION
        await waitForJobCompletion(registry.id);
    }

    // SIGNING CREDENTIAL
    const signed = await createCredential(registry?.data?.id, credentialPayload);

    if (isRevocable) {
        console.log(signed);
        setRevokableCredential({
            registryId: registry.data.id,
            credentialId: signed.data.id,
            userDid: _credential.subject.id
        });
        console.log('setting Revokable credential set in localStorage');
    }

    toast.success(`Issued ${_credential.name} credential`, { duration: 10000 });
    return signed.data;
};
