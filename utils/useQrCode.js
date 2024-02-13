import { useState, useEffect } from "react";
import { generateQR } from "./generate-qr";
import { toast } from "sonner";

const useQrCode = ({ proofTemplateId }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [proofID, setProofID] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    const handleGenerateQR = async () => {
        setIsLoading(true)
        try {
            const response = await generateQR(proofTemplateId);
            console.log("QR Code generated:", response);
            if (!response.qr && response.id) {
                toast.warning('Error generating qr code, try again or contact support.')
                setIsLoading(true)
                throw new Error('Error generating qr code')

            }
            setIsLoading(false)
            setProofID(response.id)
            setQrCodeUrl(response.qr);
        } catch (error) {
            console.error("Error generating QR code:", error);
        }
    };

    useEffect(() => {
        if (proofTemplateId && qrCodeUrl === '') {
            setTimeout(() => {
                handleGenerateQR();
            }, 1000)

        }
    }, [proofTemplateId, qrCodeUrl]);

    return {
        isLoading,
        qrCodeUrl,
        proofID,
        refetch: handleGenerateQR
    };
};

export default useQrCode;
