import { useState, useEffect } from "react";
import { generateQR } from "./generate-qr";
import { toast } from "sonner";

const useQrCode = ({ proofTemplateId }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [proofID, setProofID] = useState('');

    useEffect(() => {
        const handleGenerateQR = async () => {
            try {
                const response = await generateQR(proofTemplateId);
                console.log("QR Code generated:", response);
                if (!response.qr && response.id) {
                    toast.warning('Error generating qr code, try again or contact support.')
                    throw new Error('Error generating qr code')

                }
                setProofID(response.id)
                setQrCodeUrl(response.qr);
            } catch (error) {
                console.error("Error generating QR code:", error);
            }
        };

        console.log("Proof Template ID:", proofTemplateId);
        if (proofTemplateId && qrCodeUrl === '') {
            handleGenerateQR();
        }
    }, [proofTemplateId, qrCodeUrl]);

    return {
        qrCodeUrl,
        proofID
    };
};

export default useQrCode;
