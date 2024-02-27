import React, { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import { useLocalStorage } from 'hooks/hooks';
import { issueRevokableCredential } from 'utils/issue-crendentials';
import { createCreditScoreCredential } from '_credentials/equinet';
import { getRandomNumber } from 'utils';
import { getRegistry, revokeCredential } from 'utils/dock-registries';
import { toast } from 'sonner';
import userStore from 'store/appStore';

export default function Test() {
  const [revokableCredential, setRevokableCredential] = useLocalStorage('revokableCredential', '');
  const recipientEmail = userStore((state) => state.userEmail);
  const [loadingRevokation, setLoadingRevokation] = useState(false);

  const credentialPayload = {
    receiverDid: revokableCredential.userDid,
    recipientEmail,
    creditScore: getRandomNumber(700, 800),
  };

  async function handleRevoke() {
    if (!revokableCredential.registryId || !revokableCredential.credentialId) {
      toast.warning('There is no credential to revoke.');
      return;
    }

    setLoadingRevokation(true);
    try {
      const revokation = await revokeCredential(
        revokableCredential.registryId,
        revokableCredential.credentialId
      );
      if (revokation.status === 202) {
        toast.success('Credential revoked successfully', { duration: 10000 });
        setTimeout(async () => {
          await issueNewCredential();
        }, 3000);
      } else {
        setLoadingRevokation(false);
        throw new Error('Revocation error, try again');
      }
    } catch (error) {
      setLoadingRevokation(false);
      toast.error('Error revokating credential, try again.');
    }
  }

  const createCredential = async (credential, payload) => {
    const credentialObj = credential(payload);
    await issueRevokableCredential(credentialObj.body, setRevokableCredential);
  };

  async function issueNewCredential() {
    toast.info('Issuing new credential', { duration: 10000 });
    try {
      await createCredential(createCreditScoreCredential, credentialPayload);
      toast.success('Credentials issued successfully.');
      setLoadingRevokation(false);
    } catch (error) {
      console.log('Issuing error:', error);
      toast.warning('Error issuing credentials, try again.');
      setLoadingRevokation(false);
    }
  }

  async function handleGetRegistry() {
    const registry = await getRegistry(revokableCredential.registryId);
    console.log('registry', registry);
  }

  return (
    <div className="mainContainer ta-c pt-10">
      <div className="ta-c">
        <h1 className="text-2xl font-bold">Helper functions</h1>
      </div>
      <div className="mt-5">
        <Button
          className="m-2"
          variant="outline"
          onClick={async () => handleRevoke()}
          disabled={loadingRevokation}>
          Revoke credit score credential
        </Button>

        <Button className="m-2" variant="outline" onClick={async () => issueNewCredential()}>
          issue credit score credential
        </Button>

        <Button className="m-2" variant="outline" onClick={async () => handleGetRegistry()}>
          Get Registry
        </Button>
      </div>
    </div>
  );
}
