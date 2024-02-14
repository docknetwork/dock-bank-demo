import { useEffect, useState } from 'react';
import { proofRequest } from '../utils/request';
import { toast } from "sonner";
import qrCodeStore from "store/qrCodeStore";

export const useVerifyProof = (

) => {
    const qrCodeUrl = qrCodeStore((state) => state.qrCodeUrl)
    const proofID = qrCodeStore((state) => state.proofID)
    const setVerified = qrCodeStore((state) => state.setVerified)
    const [verificationError, setVerificationError] = useState(false);

    useEffect(() => {
        if (!qrCodeUrl || !proofID) return;

        let intervalId = setInterval(async () => {
            try {
                const statusResponse = await proofRequest(proofID);
                console.log("statusResponse:", statusResponse)

                if (statusResponse.data.verified) {
                    setVerified(statusResponse.data.verified);
                    clearInterval(intervalId);
                    toast.success("Proof request verified successfully!");
                }
            } catch (err) {
                console.error("Error checking proof request status:", err);
                toast.error("Verification error. Please try again.");
                setVerificationError(true)
                clearInterval(intervalId);
            }
        }, 5000);

        return () => {
            console.log("Clearing interval for proof request status check.");
            clearInterval(intervalId);
        };
    }, [proofID, qrCodeUrl]);

    return {
        verificationError
    };
};
