import { useEffect, useState } from 'react';
import { proofRequest } from './request';
import { toast } from "sonner";

export const useVerifyProof = (
    qrCodeUrl,
    proofID
) => {
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        if (!qrCodeUrl || !proofID) return;

        let intervalId = setInterval(async () => {
            try {
                const statusResponse = await proofRequest(proofID);
                console.log("statusResponse:", statusResponse.data)

                if (statusResponse.data.verified) {
                    setVerified(statusResponse.data.verified);
                    clearInterval(intervalId);
                    toast.success("Proof request verified successfully!");
                }
            } catch (err) {
                console.error("Error checking proof request status:", err);
                toast.error(`Error checking proof request status: ${err instanceof Error ? err.message : "Unknown error occurred"}`);
                clearInterval(intervalId);
            }
        }, 5000);

        return () => {
            console.log("Clearing interval for proof request status check.");
            clearInterval(intervalId);
        };
    }, [proofID, qrCodeUrl]);

    return {
        verified
    };
};
