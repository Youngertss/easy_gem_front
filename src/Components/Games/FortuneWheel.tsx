import React, { useState, useEffect } from 'react';
import s from "./Games.module.scss";
import axios from "axios";

import {FortuneWheelCanvas} from "./GameCanvas/FortuneWheelCanvas";

interface UserData {
    id: number;
    email: string;
    username: string;
    balance: string;
}

interface Props {
    userData: UserData | null;
}

interface GameData{
    name: string
    data:{
        cost: number;
        labels: string[];
    }
}

const labels=["10$","0$","999$","5$","1$","20$", "50$","2$","15$","1$", "100$","5$"]

export const FortuneWheel: React.FC<Props> = ({ userData }) => {
    const [abilityRotation, setAbilityRotation] = useState(true);
    const [angle, setAngle] = useState(0);
    // const [win, setWin] = useState(0);
    const [gameData, setGameData] = useState<GameData | null>(null);;

    const sectorAngle = 360 / labels.length;

    //initialization for data game and wheel
    useEffect(() => {
        const getGameData = async () => { 
            const gameDataCurr = await axios.get("games/get_game", {
                params: {
                    id: 3
                },
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            });  
            setGameData(gameDataCurr.data);
            console.log(gameData);
        };
        getGameData();
        setAngle(sectorAngle / 2);
    }, []);

    //fortune wheel api info + start animation
    const spinWheel = async () => {
        if (!abilityRotation) return;
        setAbilityRotation(false);

        const response = await axios.get(`/games/get_fortune_wheel_event`, {
            withCredentials: true
        });

        const rotation = response.data.degree;
        const income = response.data.income;
        // setWin(income);

        animateRotation(rotation, income);
    };
    //for tst withpu API
    const spinWheelTest = async () => {
        if (!abilityRotation) return;
        setAbilityRotation(false);

        animateRotation(1140, 0);
    };
    //animation
    const animateRotation = (targetRotation: number, income: number) => {
        const start = performance.now();
        const duration = 4000;
        const initialAngle = angle;

        const animate = (time: number) => {
            const elapsed = time - start; //how much time is passed
            const progress = Math.min(elapsed / duration, 1); //number in range from 0 to 1
            const easing = 1 - Math.pow(1 - progress, 3); // ease-out

            const newAngle = (initialAngle + easing * targetRotation) % 360; 
            setAngle(newAngle);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Congretulate user
                alert(`You won ${income}!`);
                setAbilityRotation(true);
                setAngle(sectorAngle/2);
            }
        };

        requestAnimationFrame(animate);
    };

    if (!userData) return null;

    return (
        <div className={s.gameLayer}>
            <div className={s.wheelBlock}>
                <FortuneWheelCanvas labels={labels} sectorAngle={sectorAngle} angle={angle} spinWheelTest={spinWheelTest}/>
            </div>
            <div className={s.gameInfo}>
                <p>Cost: {gameData?.data.cost}$</p>
                <p onClick={spinWheel} style={{ cursor: 'pointer', color: 'blue' }}>Play!</p>
            </div>
        </div>
    );
};