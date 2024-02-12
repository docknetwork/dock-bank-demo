import { toast } from 'sonner';
import { generateNonce } from './generate-nonce';
import { dockUrl } from './constants';
import { postRequest } from './request';

export const generateQR = async (
    proofTemplateID
) => {
    const proofBody = {
        nonce: `${generateNonce()}`,
        domain: 'dock.io'
    };

    try {
        const response = await postRequest(`${dockUrl}/proof-templates/${proofTemplateID}/request`, proofBody);
        if (response.status === 202) return response.data;
    } catch (err) {
        toast.error('Error generating proof request QR code:');
        // throw new Error('generateQR:Error in QR Code generation:', err);
    }
};
