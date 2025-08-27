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
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            setUser: (user) => set({ user }),
            fetchUser: async () => {
                try{
                    const res = await axios.get("/users/me", {
                        withCredentials: true
                    });
                    set({ user: res.data });
                } catch (e){
                    set({ user: null });
                    console.log(e);
                }
            }
        }),
        {
            name: "user-storage", // localStorage key
        }
    )
);