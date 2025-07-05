import { create } from "zustand";

const AUTH_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/auth/user`;
const AUTHORIZE_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/auth/google/authorize`;
const LOGOUT_ENDPOINT = `${import.meta.env.VITE_BACKEND_URL}/auth/user/logout`;

export interface User {
    ID: string;
    provider_id: string;

    name: string;
    email: string;
    image_url?: string;

    CreatedAt: Date;
    UpdatedAt: Date;
}

interface UserStore {
    user: User | null;
    isLoading: boolean;
    login: () => void;
    logout: () => void;
    refresh: () => Promise<void>;
}

export const useUserStore = create<UserStore>((set) => ({
    user: null,
    isLoading: true,

    login: () => {
        window.location.href = AUTHORIZE_ENDPOINT;
    },

    logout: () => {
        localStorage.removeItem("token");
        window.location.href = LOGOUT_ENDPOINT;
        set({ user: null });
    },

    refresh: async () => {
        const token = localStorage.getItem("token");
        try {
            if (!token) throw new Error("not logged in");

            set({ isLoading: true });
            const res = await fetch(AUTH_ENDPOINT, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await res.json();

            if (res.status !== 200 || !data.user) {
                throw new Error("Failed to fetch user");
            }

            set({ user: data.user });
        } catch (err) {
            console.error((err as Error).message);
            set({ user: null });
        } finally {
            set({ isLoading: false });
        }
    },
}));
