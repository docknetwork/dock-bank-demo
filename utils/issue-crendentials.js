import { toast } from 'sonner';
import { createCredential } from './dock-credentials';

export const issueRevokableCredential = async (credential, setRevokableCredential, isRevocable) => {
    const credentialPayload = credential;
    const _credential = credentialPayload.credential;

    // SIGNING CREDENTIAL
    const signed = await createCredential(isRevocable, credentialPayload);

    if (isRevocable) {
        console.log(signed);
        setRevokableCredential({
            credentialId: signed.data.id,
            userDid: _credential.subject.id
        });
        console.log('setting Revokable credential set in localStorage');
    }

    toast.success(`Issued ${_credential.name} credential`, { duration: 10000 });
    return signed.data;
};
