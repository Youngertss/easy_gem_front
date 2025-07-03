import { create } from "zustand";
import { persist } from "zustand/middleware";

import axios from "axios";


interface UserData {
    id: number;
    email: string;
    username: string;
    balance: number;
    photo: string;
    favorite_game_id: number;
    total_withdrawn: number;
    total_withdrawals: number;
    created_at: string;
}

interface UserState {
    user: UserData | null;
    setUser: (user: UserData | null) => void;
    fetchUser: () => Promise<void>;
    accessToken: string | null;
    setAccessToken: (accessToken: string | null) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            accessToken: null,
            setAccessToken: (accessToken) => set({ accessToken }),
            user: null,
            setUser: (user) => set({ user }),
            fetchUser: async () => {
                const token = get().accessToken;
                if (!token) return;

                const res = await axios.get("/users/me", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                set({ user: res.data });
            }
        }),
        {
            name: "user-storage", // localStorage key
        }
    )
);