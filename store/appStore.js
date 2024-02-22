import { create } from 'zustand';

const userStore = create((set) => ({
    Did: '',
    userEmail: '',
    setDid: (did) => {
        set(() => ({ Did: did }));
    },
    setUserEmail: (email) => {
        set(() => ({ userEmail: email }));
    },
    isHelperOpen: false,
    setIsHelperOpen: (open) => {
        set(() => ({ isHelperOpen: open }));
    }
}));

export default userStore;
