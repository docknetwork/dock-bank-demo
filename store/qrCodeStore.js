import { create } from 'zustand';

const qrCodeStore = create((set) => ({
    qrCodeUrl: '',
    proofID: '',
    isLoading: true,
    verified: false,
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
