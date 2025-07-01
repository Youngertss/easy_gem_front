import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';

import s from "./App.module.scss";
import { Header } from "./Components/Header/Header";
import { ModalReg } from "./Components/Header/authorizing/ModalReg";
import { ModalLog } from "./Components/Header/authorizing/ModalLog";
import { SideBar } from "./Components/SideBar/SideBar";
import { MainPage } from "./Components/MainPage/MainPage";
import { Games } from "./Components/Games/Games";
import { FortuneWheel } from "./Components/Games/FortuneWheel";

import { Bonuses } from "./Components/Bonuses/Bonuses";
import { Chat } from "./Components/Chat/Chat";
import { FAQ } from "./Components/FAQ/FAQ";
import { UserProfile } from "./Components/Profile/UserProfile";
import { Deposite } from "./Components/Profile/Deposite";
import { Settings } from "./Components/Profile/Settings";
import { RefferalProgram } from "./Components/Profile/RefferalProgram";

import axios from "axios";

const App = () => {
    const [user, setUser] = useState(null);
    const [isModalRegistrationOpen, setIsModalRegistrationOpen] = useState(false);
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

    const openLoggining = () => {setIsModalLoginOpen(true)};
    const openRegistration = () => {setIsModalRegistrationOpen(true)};
    
    const closeLoggining = () => {setIsModalLoginOpen(false)};
    const closeRegistration = () => {setIsModalRegistrationOpen(false)};

    const onLogout = async () => {
        try {
            const response = await axios.post("/auth/jwt/logout", {
                withCredentials: true,
            });

            console.log("User is logged OUT", response);
            setUser(null); 
        } catch (err: any){
            console.error("Error while logout", err.response?.data || err.message);
            alert("Error while logout: " + (err.response?.data || "unknown error"));
        }
    }
    
    useEffect (() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`/users/me`, {
                    withCredentials: true,
                })
                setUser(response.data);
                console.log(response.data);
            } catch (err: any){
                console.log("Unauthorized or error:", err);
            }
        }
        fetchUser();
    }, []);

    return (
        <Router>
        <div className={!(isModalRegistrationOpen || isModalLoginOpen) ? "" : s.wrapperBlured}>
          <Header openLoggining={openLoggining} openRegistration={openRegistration} onLogout={onLogout} userData={user}/>
          <div className={s.mainPart}>
            <SideBar />
            <div className={s.content}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/MainPage" element={<MainPage />} />
                <Route path="/Games" element={<Games userData={user} openLoggining={openLoggining}/>} />
                <Route path="/Bonuses" element={<Bonuses />} />
                <Route path="/Chat" element={<Chat />} />
                <Route path="/FAQ" element={<FAQ />} />

                <Route path="/profile" element={<UserProfile userData={user}/>}/>
                <Route path="/deposite" element={<Deposite/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/refferalProgram" element={<RefferalProgram/>}/>

                <Route path="/FortuneWheel" element={<FortuneWheel userData={user}/>} />
              </Routes>
            </div>
          </div>
        </div>
            {isModalLoginOpen && (
                    <ModalLog closeModal={closeLoggining}/>
                )}
            {isModalRegistrationOpen && (
                    <ModalReg closeModal={closeRegistration}/>
                )}
        </Router>
      );
};

export default App;

// useEffect(() => {
//     axios
//         .post(
//             "http://127.0.0.1:8000/auth/jwt/login",
//             new URLSearchParams({
//                 username: "jorikmajorik2018@gmail.com",
//                 password: "JorikKrytoiChel228",
//             })
//         )
//         .then((e) => {
//             console.log(e);
//         })
//         .catch((e) => {
//             console.log("Возникла ошибка");
//             console.log(e);
//         });
// }, []);