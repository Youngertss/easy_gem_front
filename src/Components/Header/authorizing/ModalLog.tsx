import React, {useState} from "react";
import axios from "axios";
import s from "./Authorizing.module.scss";

import { useUserStore } from "../../../store/userStore";

interface ModalProps {
    closeModal: () => void;
}


export const ModalLog:React.FC<ModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const setAccessToken = useUserStore((state) => state.setAccessToken)
    const fetchUser = useUserStore((state) => state.fetchUser)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            username:email,
            password:password
        };

        try {
            const response = await axios.post("/auth/jwt/login", data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });
            const token = response.data.access_token;
            setAccessToken(token);

            console.log("Response is OK", response);
            closeModal();
            fetchUser();
        } catch (err: any){
            console.error("Ошибка входа:", err.response?.data || err.message);
            alert("Ошибка входа: " + (err.response?.data || "неизвестная ошибка"));
        }

    }

    return (
        <div className={s.modalOverlay} onClick={closeModal}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={s.formGroup}>
                        <label>
                            Email:
                        </label>
                        <input type="text" name="email" value={email} onChange={(e) => 
                            setEmail(e.target.value)
                        } placeholder="email..."/>
                    </div>
                    <div className={s.formGroup}>
                        <label>
                            Password:
                        </label>
                        <input type="password" name="password" value={password} onChange={(e) => 
                            setPassword(e.target.value)
                        } placeholder="password..."/>
                    </div><br></br>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    )
}