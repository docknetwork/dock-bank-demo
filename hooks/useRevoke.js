import { useState } from 'react';
import { useLocalStorage } from 'hooks/hooks';
import { issueRevokableCredential } from 'utils/issue-crendentials';
import { createCreditScoreCredential } from '_credentials/equinet';
import { getRandomNumber } from 'utils';
import { getRegistry, revokeCredential } from 'utils/dock-registries';
import { toast } from 'sonner';
import userStore from 'store/appStore';

export const useRevoke = () => {

    const [revokableCredential, setRevokableCredential] = useLocalStorage('revokableCredential', '');
    const [loadingRevokation, setLoadingRevokation] = useState(false)
    const recipientEmail = userStore((state) => state.userEmail);

    const credentialPayload = {
        receiverDid: revokableCredential.userDid,
        recipientEmail,
        creditScore: getRandomNumber(600, 699)
    };

    async function handleRevoke() {
        if (!revokableCredential.credentialId) {
            toast.warning('There is no credential to revoke.')
            return
        }

        setLoadingRevokation(true);
        try {
            const revokation = await revokeCredential(revokableCredential.credentialId)
            if (revokation.status === 202) {
                toast.success('Credential revoked successfully', { duration: 10000 })
                setTimeout(async () => {
                    await issueNewCredential()
                }, 3000)
            } else {
                setLoadingRevokation(false);
                throw new Error('Revocation error, try again');
            }
        } catch (error) {
            setLoadingRevokation(false);
            toast.error('Error revokating credential, try again.')
        }
    }

    const createCredential = async (credential, payload) => {
        const credentialObj = credential(payload);
        await issueRevokableCredential(credentialObj.body, setRevokableCredential);
    };

    async function issueNewCredential() {
        toast.info('Issuing new credential', { duration: 10000 })
        try {
            await createCredential(createCreditScoreCredential, credentialPayload)
            toast.success('Credentials issued successfully.');
            setLoadingRevokation(false);
        } catch (error) {
            console.log('Issuing error:', error);
            toast.warning('Error issuing credentials, try again.')
            setLoadingRevokation(false);
        }
    }

    return {
        loadingRevokation,
        handleRevoke,
        issueNewCredential
    }
}