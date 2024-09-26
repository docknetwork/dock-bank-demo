import { toast } from 'sonner';
import { postRequestLocal } from './request';

export const generateQR = async (
    proofTemplateID
) => {
    try {
        const response = await postRequestLocal('create-proof-request', {
            proofTemplateID,
        });
        if (response.status === 202) return response.data;
        return undefined;
    } catch (err) {
        toast.error('Error generating proof request QR code:');
        throw new Error(err);
    }
};
