import React, { useState, useRef, useEffect} from 'react';
import s from "./Games.module.scss";
import axios from "axios";

interface UserData{
    id: number;
    email: string;
    username: string;
    balance: string;
}

interface Props{
    userData: UserData | null;
}

export const FortuneWheel: React.FC<Props> = ({userData}) => {
    const wheelRef = useRef<HTMLImageElement>(null);
    const [abilityRotation, setAbilityRotation] = useState(true);
    // const [rotation, setRotation] = useState(0);
    const [win, setWin] = useState(0);

    useEffect (() =>{
        const gameData = "";
    }, []);

    useEffect(() => {
        const handleTransitionEnd = () => {
            // Анимация завершилась — покажем результат
            alert(`Вы выиграли ${win}$`);
            setAbilityRotation(true); // снова можно крутить
        };

        const wheelEl = wheelRef.current;
        if (wheelEl) {
            wheelEl.addEventListener("transitionend", handleTransitionEnd);
        }

        // Удалим обработчик при размонтировании компонента
        return () => {
            if (wheelEl) {
                wheelEl.removeEventListener("transitionend", handleTransitionEnd);
            }
        };
    }, [win]);

    if (!userData) return null;

    const spinWheel = async () =>{
        if (abilityRotation){
            setAbilityRotation(false);
            const response = await axios.get(`/games/get_fortune_wheel_event`);
            const rotation = response.data.degree;

            if (wheelRef.current){
                wheelRef.current.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
                wheelRef.current.style.transform = `rotate(${rotation}deg)`;
            }

            setWin(response.data.income);
        }
    }
    const spinWheelTest = async () =>{
        console.log("test");
        if (wheelRef.current){
                wheelRef.current.style.transition = "transform 4s cubic-bezier(0.33, 1, 0.68, 1)";
                wheelRef.current.style.transform = `rotate(${1140}deg)`;
            }
    }


    

    return(
        <div className={s.gameLayer}>
            <div className={s.wheelBlock}>
                <img src="/imgs/games/FortuneWheel.png"
                    className={s.wheel} alt="wheel" ref={wheelRef}
                    />
                <img src="/imgs/games/arrow_up.png"
                    className={s.arrowUp} alt="arrowUp" 
                    onClick={spinWheelTest}
                />
                    
            </div>
            <div className={s.gameInfo}>
                <p>Cost: 50$</p>
                <p>Play!</p>
            </div>
        </div>
    );
};