import { create } from 'zustand';

const qrCodeStore = create((set) => ({
    proofTemplateId: '',
    qrCodeUrl: '',
    proofID: '',
    isLoading: true,
    verified: false,
    verificationError: false,
    setVerificationError: (isError) => {
        set(() => ({ verificationError: isError }))
    },
    setProofTemplateId: (proofTemplateId) => {
        set(() => ({ proofTemplateId: proofTemplateId }))
    },
    setQrCodeUrl: (qrCodeUrl) => {
        set(() => ({ qrCodeUrl: qrCodeUrl }))
    },
    setProofID: (proofID) => {
        set(() => ({ proofID: proofID }))
    },
    setIsLoading: (loading) => {
        set(() => ({ isLoading: loading }))
    },
    setVerified: (verified) => {
        set(() => ({ verified: verified }))
    }
}));

export default qrCodeStore;
