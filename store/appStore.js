import { create } from "zustand";

export const userStore = create((set) => ({
    Did: "",
    userEmail: "",
    setDid: async (did) => {
        set(() => ({ Did: did }));
    },
    setUserEmail: async (email) => {
        set(() => ({ userEmail: email }));
    }
}));
