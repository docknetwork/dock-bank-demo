import { useState, useEffect } from "react";
import { generateQR } from "./generate-qr";

const useQrCode = ({ proofTemplateId }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState('');

    useEffect(() => {
        const handleGenerateQR = async () => {
            try {
                const response = await generateQR(proofTemplateId);
                console.log("QR Code generated:", response.qr);
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
        qrCodeUrl
    };
};

export default useQrCode;
