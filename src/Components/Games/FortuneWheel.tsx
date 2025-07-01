import React, { useState, useRef, useEffect } from 'react';
import s from "./Games.module.scss";
import axios from "axios";

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
const colors=["#9966FF", "#C9CBCF", "#FF6384", "#FFCE56", "#00A877"]

export const FortuneWheel: React.FC<Props> = ({ userData }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [abilityRotation, setAbilityRotation] = useState(true);
    const [angle, setAngle] = useState(0);
    const [win, setWin] = useState(0);
    const [gameData, setGameData] = useState<GameData | null>(null);;

    const sectorAngle = 360 / labels.length;

    // Drawin the wheel
    const drawWheel = (context: CanvasRenderingContext2D, currentAngle: number) => {
        const centerX = context.canvas.width / 2;
        const centerY = context.canvas.height / 2;
        const radius = 150; //also the length of borders in sectors

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (let i = 0; i < labels.length; i++) {
            const start = (i * sectorAngle + currentAngle) * Math.PI / 180;
            const end = ((i + 1) * sectorAngle + currentAngle) * Math.PI / 180;

            // Sector
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, start, end);

            //choose a color for sector
            const currPrize = parseInt(labels[i].slice(0, -1));
            let currColor = colors[3]; //jackpot - yellow

            if (currPrize < 5 ){
                currColor = colors[1]; //grey
            }  else if(currPrize==5){
                currColor = colors[2]; //red
            } else if (currPrize <= 20){
                currColor = colors[4]; //green
            } else if (currPrize <= 100){
                currColor = colors[0]; //purple
            }

            context.fillStyle = currColor;
            context.fill();
            context.stroke();

            // Label
            context.save();
            context.translate(centerX, centerY); //moving center back to center
            context.rotate((start + end) / 2); //rotating the text
            context.textAlign = "right";
            context.fillStyle = "black";
            context.font = "16px sans-serif";
            context.fillText(labels[i], radius - 10, 5); //gap from center
            context.restore();
        }

        // Стрелка
        context.beginPath();
        context.moveTo(centerX - 10, centerY + 2); //left point
        context.lineTo(centerX, centerY - 18); //upper point
        context.lineTo(centerX + 10, centerY + 2); //right point
        context.fillStyle = "red";
        context.fill();
    };

    //drawing a wheel basing on curr angle 
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        drawWheel(context, angle);
    }, [angle]);

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
        setAngle((360/labels.length) / 2);
    }, []);

    const spinWheel = async () => {
        if (!abilityRotation) return;
        setAbilityRotation(false);

        const response = await axios.get(`/games/get_fortune_wheel_event`);
        const rotation = response.data.degree;
        const income = response.data.income;
        setWin(income);

        animateRotation(rotation);
    };

    const spinWheelTest = async () => {
        animateRotation(1140);
    };

    const animateRotation = (targetRotation: number) => {
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
                // Get the winner`s sector
                alert(`You won some sum!`);
                setAbilityRotation(true);
                setAngle(0);
            }
        };

        requestAnimationFrame(animate);
    };

    if (!userData) return null;

    return (
        <div className={s.gameLayer}>
            <div className={s.wheelBlock}>
                <canvas ref={canvasRef} width={400} height={400} className={s.wheel} onClick={spinWheelTest}/>
                {/* <img
                    src="/imgs/games/arrow_up.png"
                    className={s.arrowUp}
                    alt="arrowUp"
                    onClick={spinWheelTest}
                /> */}
            </div>
            <div className={s.gameInfo}>
                <p>Cost: {gameData?.data.cost}$</p>
                <p onClick={spinWheel} style={{ cursor: 'pointer', color: 'blue' }}>Play!</p>
            </div>
        </div>
    );
};