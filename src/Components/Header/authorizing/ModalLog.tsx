import React, {useState} from "react";
import axios from "axios";
import s from "./Authorizing.module.scss";

interface ModalProps {
    closeModal: () => void;
}


export const ModalLog:React.FC<ModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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

            console.log("Response is OK", response);
            closeModal();
            window.location.reload();
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