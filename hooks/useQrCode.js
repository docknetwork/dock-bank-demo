import { useEffect } from "react";
import { generateQR } from "../utils/generate-qr";
import { toast } from "sonner";
import qrCodeStore from "store/qrCodeStore";

const useQrCode = ({ proofTemplateId }) => {

    const templateId = qrCodeStore((state) => state.proofTemplateId)
    const setTemplateId = qrCodeStore((state) => state.setProofTemplateId)
    const setQrCodeUrl = qrCodeStore((state) => state.setQrCodeUrl)
    const setProofID = qrCodeStore((state) => state.setProofID)
    const setIsLoading = qrCodeStore((state) => state.setIsLoading)
    const setVerified = qrCodeStore((state) => state.setVerified)

    const handleGenerateQR = async () => {
        setIsLoading(true)
        setVerified(false)
        try {
            const response = await generateQR(proofTemplateId);
            console.log("QR Code generated:", response);
            if (!response.qr && !response.id) {
                toast.warning('Error generating qr code, try again or contact support.')
                setIsLoading(true)
                throw new Error('Error generating qr code')
            }
            setIsLoading(false)
            setProofID(response.id)
            setQrCodeUrl(response.qr);
        } catch (error) {
            setIsLoading(false)
            console.error("Error generating QR code:", error);
        }
    };

    useEffect(() => {
        if (proofTemplateId !== templateId) {

            setTemplateId(proofTemplateId);
            setTimeout(() => {
                handleGenerateQR();
            }, 1000)
        }
    }, [templateId]);

    return {
        refetch: handleGenerateQR
    };
};

export default useQrCode;
