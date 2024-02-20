import { useEffect } from 'react';
import { proofRequest } from '../utils/request';
import { toast } from "sonner";
import qrCodeStore from "store/qrCodeStore";

export const useVerifyProof = () => {
    const qrCodeUrl = qrCodeStore((state) => state.qrCodeUrl)
    const proofID = qrCodeStore((state) => state.proofID)
    const setVerified = qrCodeStore((state) => state.setVerified)
    const setVerificationError = qrCodeStore((state) => state.setVerificationError)

    async function handleProofRequest(statusResponse, intervalId) {
        if (statusResponse.data.verified === true) {
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
                console.log("statusResponse:", statusResponse)
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
