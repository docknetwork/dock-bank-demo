import { useEffect } from 'react';
import { proofRequest } from '../utils/request';
import { toast } from "sonner";
import userStore from 'store/appStore';
import qrCodeStore from "store/qrCodeStore";

/**
 * @description Custom React hook for verifying proof requests. Each 5 seconds will make a request to check if qr code is verified
 * @param it uses qrCodeStore proofID attribute to set the current request state.
 * @returns React.FC Form Field
 */

export const useVerifyProof = () => {
    const setUserDid = userStore((state) => state.setDid)
    const qrCodeUrl = qrCodeStore((state) => state.qrCodeUrl)
    const proofID = qrCodeStore((state) => state.proofID)
    const setVerified = qrCodeStore((state) => state.setVerified)
    const setVerificationError = qrCodeStore((state) => state.setVerificationError)

    async function handleProofRequest(statusResponse, intervalId) {
        console.log("statusResponse:", statusResponse)
        if (statusResponse.data.verified === true) {
            const holder = statusResponse.data.presentation.credentials[0].credentialSubject.id
            console.log('holder:', holder);
            if (!holder) {
                throw new Error('No holder present in the verification request')
            }
            setUserDid(holder)
            setVerified(statusResponse.data.verified);
            clearInterval(intervalId);
            toast.success("Proof request verified successfully!");
            return true
        }
        return false
    }

    useEffect(() => {
        if (!qrCodeUrl || !proofID) return;

        let intervalId = setInterval(async () => {
            try {
                const statusResponse = await proofRequest(proofID);
                await handleProofRequest(statusResponse, intervalId)
            } catch (err) {
                setTimeout(async () => {
                    console.log('Retrying Qr verification last time')
                    const statusResponse = await proofRequest(proofID);
                    const proof = await handleProofRequest(statusResponse, intervalId)
                    if (proof !== true) {
                        setVerificationError(true)
                        console.error("Error checking proof request status:", err);
                        toast.error("Verification error. Please try again.");
                    }
                }, 1000)

                clearInterval(intervalId);
            }
        }, 5000);

        return () => {
            console.log("Clearing interval for proof request status check.");
            clearInterval(intervalId);
        };

    }, [proofID, qrCodeUrl]);

};
