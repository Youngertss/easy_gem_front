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
import { SafeHack } from "./Components/Games/SafeHack";

import { Bonuses } from "./Components/Bonuses/Bonuses";
import { Chat } from "./Components/Chat/Chat";
import { FAQ } from "./Components/FAQ/FAQ";
import { UserProfile } from "./Components/Profile/UserProfile";
import { Deposit } from "./Components/Profile/Deposit";
import { Settings } from "./Components/Profile/Settings";
import { RefferalProgram } from "./Components/Profile/RefferalProgram";

import { useUserStore } from "./store/userStore";
import axios from "axios";

const App = () => {
    const fetchUser = useUserStore((set) => set.fetchUser)
    const setUser = useUserStore((set) => set.setUser)

    const [isModalRegistrationOpen, setIsModalRegistrationOpen] = useState(false);
    const [isModalLoginOpen, setIsModalLoginOpen] = useState(false);

    const openLoggining = () => {setIsModalLoginOpen(true)};
    const openRegistration = () => {setIsModalRegistrationOpen(true)};
    
    const closeLoggining = () => {setIsModalLoginOpen(false)};
    const closeRegistration = () => {setIsModalRegistrationOpen(false)};

    const onLogout = async () => {
        try {
            const response = await axios.post("/auth/jwt/logout", null, {
                headers: {
                    withCredentials: true,
                },
            });

            console.log("User is logged OUT", response);
            setUser(null); 

        } catch (err: any){
            console.error("Error while logout", err.response?.data || err.message);
            alert("Error while logout: " + (err.response?.data || "unknown error"));
        }
    }
    
    useEffect (() => {
        fetchUser();
    }, []);

    return (
        <Router>
        <div className={!(isModalRegistrationOpen || isModalLoginOpen) ? "" : s.wrapperBlured}>
          <Header openLoggining={openLoggining} openRegistration={openRegistration} onLogout={onLogout}/>
          <div className={s.mainPart}>
            <SideBar />
            <div className={s.content}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/MainPage" element={<Games openLoggining={openLoggining}/>} />
                <Route path="/Games" element={<Games openLoggining={openLoggining}/>} />
                <Route path="/Bonuses" element={<Bonuses />} />
                <Route path="/FAQ" element={<FAQ />} />

                <Route path="/profile/:profileUsername" element={<UserProfile/>}/>
                <Route path="/deposite" element={<Deposit/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/refferalProgram" element={<RefferalProgram/>}/>

                <Route path="/FortuneWheel" element={<FortuneWheel/>} />
                <Route path="/SafeHack" element={<SafeHack/>} />
              </Routes>
            </div>
            <Chat openLoggining={openLoggining} />
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