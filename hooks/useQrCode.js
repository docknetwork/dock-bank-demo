import { generateQR } from "../utils/generate-qr";
import { toast } from "sonner";
import qrCodeStore from "store/qrCodeStore";

const useQrCode = ({ proofTemplateId }) => {

    const qrCodeStates = qrCodeStore((state) => state);

    async function handleCreateQr() {
        const response = await generateQR(proofTemplateId);

        if (response === undefined || response === null) return;

        if (!response.qr && !response.id) {
            toast.warning('Error generating qr code, try again or contact support.')
            qrCodeStates.setIsLoading(true)
            throw new Error('Error generating qr code')
        }
        qrCodeStates.setIsLoading(false)
        qrCodeStates.setProofID(response.id)
        qrCodeStates.setQrCodeUrl(response.qr);
    }

    const handleGenerateQR = async () => {
        qrCodeStates.setIsLoading(true)
        qrCodeStates.setVerified(false)
        qrCodeStates.setVerificationError(false)
        qrCodeStates.setProofTemplateId(proofTemplateId);
        qrCodeStates.setRetrievedData(null)
        try {
            await handleCreateQr()
        } catch (error) {
            qrCodeStates.setQrCodeUrl('');
            qrCodeStates.setVerified(false)
            qrCodeStates.setIsLoading(false)
            console.error("Error generating QR code:", error);
        }
    };

    return {
        refetch: handleGenerateQR
    };
};

export default useQrCode;
