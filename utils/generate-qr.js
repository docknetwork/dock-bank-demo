import { generateNonce } from "./generate-nonce";
import { dockUrl } from "./constants";
import { toast } from "sonner";
import { postRequest } from "./request";

export const generateQR = async (
    proofTemplateID    
) => {

    const proofBody = {
        "nonce": `${generateNonce()}`,
        "domain": "dock.io"
    };

    try {
        console.log("Generating QR Code for:", proofTemplateID);

        const response = await postRequest(`${dockUrl}/proof-templates/${proofTemplateID}/request`, proofBody)

        console.log("QR Code generation response:", response);

        if (response.qr) {            
            return response;
        } else {
            throw new Error("QR Code URL not found in response");
        }

    } catch (err) {
        toast.error("Error generating proof request QR code:");
        console.error("Error in QR Code generation:", err);
    }
};
