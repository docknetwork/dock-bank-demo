import { generateQR } from "../utils/generate-qr";
import { toast } from "sonner";
import qrCodeStore from "store/qrCodeStore";

const useQrCode = ({ proofTemplateId }) => {

    const setTemplateId = qrCodeStore((state) => state.setProofTemplateId)
    const setQrCodeUrl = qrCodeStore((state) => state.setQrCodeUrl)
    const setProofID = qrCodeStore((state) => state.setProofID)
    const setIsLoading = qrCodeStore((state) => state.setIsLoading)
    const setVerified = qrCodeStore((state) => state.setVerified)
    const setVerificationError = qrCodeStore((state) => state.setVerificationError)

    async function handleCreateQr() {
        const response = await generateQR(proofTemplateId);
        if (!response && !response.qr && !response.id) {
            toast.warning('Error generating qr code, try again or contact support.')
            setIsLoading(true)
            throw new Error('Error generating qr code')
        }
        setIsLoading(false)
        setProofID(response.id)
        setQrCodeUrl(response.qr);
    }

    const handleGenerateQR = async () => {
        console.log('generating QR code');
        setIsLoading(true)
        setVerified(false)
        setVerificationError(false)
        setTemplateId(proofTemplateId);
        try {
            await handleCreateQr()
        } catch (error) {
            setQrCodeUrl('');
            setVerified(false)
            setIsLoading(false)
            console.error("Error generating QR code:", error);
        }
    };

    return {
        refetch: handleGenerateQR
    };
};

export default useQrCode;
