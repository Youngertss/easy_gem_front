import React, { useState, useEffect } from 'react';
import s from "./Games.module.scss";
import axios from "axios";

import {FortuneWheelCanvas} from "./GameCanvas/FortuneWheelCanvas";
import { useUserStore } from "../../store/userStore";
import {PrizeWindow} from "./FortuneWheelPrizeWindow";

interface GameData{
    name: string
    data:{
        cost: number;
        labels: string[];
    }
}

const labels=["10$","0$","999$","5$","1$","20$", "50$","2$","15$","1$", "100$","5$"]

export const FortuneWheel = () => {
    const userData = useUserStore((set) => set.user);
    const setUser = useUserStore((set) => set.setUser);

    const [abilityRotation, setAbilityRotation] = useState(true);
    const [angle, setAngle] = useState(0);
    const [gameData, setGameData] = useState<GameData | null>(null);;
    const [win, setWin] = useState(0);
    const [showPrize, setShowPrize] = useState(false);
 
    const sectorAngle = 360 / labels.length;

    const closeWindow = () => {
        setShowPrize(false); 
        setAngle(sectorAngle/2)
    };
    //initialization for data game and wheel
    useEffect(() => {
        const getGameData = async () => { 
            const gameDataCurr = await axios.get("games/get_game", {
                params: {
                    "name": "FortuneWheel"
                },
                headers: {
                    "Content-Type": "application/json",
                }
            });  
            setGameData(gameDataCurr.data);
            console.log(gameDataCurr);
        };
        getGameData();
        setAngle(sectorAngle / 2);
    }, []);

    if (!userData || !gameData) return null;

    //fortune wheel api info + start animation
    const spinWheel = async () => {
        if (!abilityRotation) return;
        setAbilityRotation(false);

        let response;
        try {
            response = await axios.get(`/games/get_fortune_wheel_event`, {
                withCredentials: true
            });
        } catch (error:any){
            if (axios.isAxiosError(error)) {
                if (error.response?.status === 403) {
                    alert(error.response.data.detail); // "Not enough credits"
                } else{
                    console.log(error);
                };
        }};
        if (!response) return; 
        console.log(response.data)
        const rotation = response.data.degree;
        const income = response.data.income;
        // setWin(income);

        setUser({ //reload mini-profile balance
            ...userData,
            balance: userData.balance - gameData.data.cost
        }); 


        animateRotation(rotation, income);
    };

    //for test without API
    const spinWheelTest = async () => {
        if (!abilityRotation) return;
        setAbilityRotation(false);

        animateRotation(1140, 0);
    };
    //animation
    const animateRotation = (targetRotation: number, income: number) => {
        const start = performance.now();
        const duration = 6000;
        const initialAngle = sectorAngle / 2;

        const animate = (time: number) => {
            const elapsed = time - start; //how much time is passed
            const progress = Math.min(elapsed / duration, 1); //number in range from 0 to 1
            const easing = 1 - Math.pow(1 - progress, 3); // ease-out

            const newAngle = (initialAngle - easing * targetRotation + 360) % 360; 
            setAngle(newAngle);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Congretulate user
                setUser({ //reload mini-profile balance
                    ...userData,
                    balance: Number(userData.balance) + (Number(income) - Number(gameData.data.cost))
                });

                setWin(income);
                setShowPrize(true);
                
                setAbilityRotation(true);
            }
        };

        requestAnimationFrame(animate);
    };


    return (
        <div className={s.pageLayer}>
            <div className={s.wheelBlock}>
                <FortuneWheelCanvas labels={labels} sectorAngle={sectorAngle} angle={angle} spinWheelTest={spinWheelTest}/>
            </div>
            <div className={s.gameInfo}>
                <p style={{ cursor: 'pointer', color: 'rgb(239, 255, 228)' }}>Cost: {gameData.data.cost}$</p>
                <p onClick={spinWheel} style={{ cursor: 'pointer', color: 'rgb(253, 255, 146)' }}>Play!</p>
            </div>
            {showPrize ? <PrizeWindow income={win} closeWindow={closeWindow} spinWheel={spinWheel}/> : ""}
        </div>
    );
};