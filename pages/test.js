import React, { useEffect, useState } from 'react';
import { Button } from 'components/ui/button';
import { issueRevokableCredential } from 'utils/issue-crendentials';
import { createBiometricsCredential } from '_credentials/forsur';
import { createBankIdCredential } from '_credentials/quotient';
import { createCreditScoreCredential } from '_credentials/equinet';
import { useLocalStorage } from 'utils/hooks';
import userStore from 'store/appStore';

export default function Test() {
    const receiverDid = userStore((state) => state.Did);
    const recipientEmail = userStore((state) => state.userEmail);
    const [storageRegistryId, setStorageRegistryId] = useLocalStorage('registryId', '');

    const createCredential = async (credential, payload) => {
        const credentialObj = credential(payload);
        await issueRevokableCredential(credentialObj.body, setStorageRegistryId);
    };

    const payload = {
        receiverDid,
        recipientEmail,
    };

    const quotientPayload = {
        receiverDid,
        recipientEmail,
        receiverName: "Jhon Smith",
        receiverAddress: "Central park 102"
    }

    async function issueCredentials() {
        await Promise.all([
            createCredential(createBiometricsCredential, payload),
            createCredential(createBankIdCredential, quotientPayload),
            createCredential(createCreditScoreCredential, payload),
        ]);
    }
    return (
        <div className="mainContainer ta-c pt-10">
            <Button variant="outline" onClick={async () => await issueCredentials()}>
                Issue
            </Button>
        </div>
    );
}
