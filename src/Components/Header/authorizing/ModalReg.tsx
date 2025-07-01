import React, {useState} from "react";
import axios from "axios";
import s from "./Authorizing.module.scss";

interface ModalProps {
    closeModal: () => void;
}


export const ModalReg:React.FC<ModalProps> = ({ closeModal }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [username, setUsername] = useState(""); 

    const handleSubmit = async (e: React.FormEvent) => {   
        e.preventDefault();

        const data = {
            email:email,
            password:password,
            username:username,
            phone_number:"string", 
        };

        try {
            const response = await axios.post("/auth/register", data, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log("Response is OK, loggining: ", response);
            //immidiately login in
            const login_data = {
                username:email,
                password:password, 
            };

            const response_login = await axios.post("/auth/jwt/login", login_data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            });

            console.log("Response login is OK", response_login);
            closeModal();
            window.location.reload();

        } catch (err:any) {
            console.error("Ошибка регистрации:", err.response?.data || err.message);
            alert("Ошибка регистрации: " + (err.response?.data?.detail || "неизвестная ошибка"));
        }
    }


    return (
        <div className={s.modalOverlay} onClick={closeModal}>
            <div className={s.modalContent} onClick={(e) => e.stopPropagation()}>
            <h2>Registration</h2>
                <form onSubmit={handleSubmit}>
                <div className={s.formGroup}>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="username..."
                    />
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email..."
                    />
                </div>
                <div className={s.formGroup}>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password..."
                    />
                </div>
                <button type="submit">
                    Submit
                </button>
            </form>
            </div>
        </div>
    )
}