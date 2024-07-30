import { toast } from 'sonner';
import { createRegistry, getExistingRegistry } from './dock-registries';
import { createCredential } from './dock-credentials';
import { waitForJobCompletion } from './dock-jobs';

export const issueRevokableCredential = async (credential, setRevokableCredential, isRevocable) => {
    const credentialPayload = credential;
    const _credential = credentialPayload.credential;

    let registry = null;
    if (isRevocable) {
        const type = (credentialPayload.algorithm === 'dockbbs' || credentialPayload.algorithm === 'bbdt16') ? 'DockVBAccumulator2022' : 'StatusList2021Entry';
        registry = await getExistingRegistry(_credential.issuer.id, type);

        console.log(`credential algo ${credentialPayload.algorithm} reg type: ${type} registry: ${registry?.id}`);
        if (!registry) {
            // CREATING REGISTRY
            const newRegistry = await createRegistry(_credential.issuer.id, type);
            // WAITING FOR REGISTRY JOB CONFIRMATION
            await waitForJobCompletion(newRegistry.id);
            registry = newRegistry.data;
        }
    }

    // SIGNING CREDENTIAL
    const signed = await createCredential(registry?.id, credentialPayload);

    if (isRevocable) {
        console.log(signed);
        setRevokableCredential({
            registryId: registry.id,
            credentialId: signed.data.id,
            userDid: _credential.subject.id
        });
        console.log('setting Revokable credential set in localStorage');
    }

    toast.success(`Issued ${_credential.name} credential`, { duration: 10000 });
    return signed.data;
};
