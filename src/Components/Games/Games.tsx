import React from 'react';
import { useNavigate  } from 'react-router-dom';

import s from "./GamesMenu.module.scss"

import { useUserStore } from "../../store/userStore";

interface Props{
    openLoggining: () => void;
}

export const Games: React.FC<Props> = ({ openLoggining}) => {
    const userData = useUserStore((set) => set.user);

    const navigate = useNavigate();

    const handleGameClick = (path: string) => {
        if (!userData){
            openLoggining();
        }
        else{
            navigate(path);
        }
    };

    return (
        <div className={s.layout}>
            <div className={s.categoryBlock}>
                <p className={s.categoryHeader}>The Most Popular</p>
                <div className={s.categoryGames}>
                    <img src={"imgs/games/FortuneWheelPic.jpg"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheel")}/>
                    <img src={"imgs/games/safehack.png"} className={s.gamePicture} onClick={() => handleGameClick("/SafeHack")}/>
                    <img src={"imgs/games/sss.png"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>

            <div className={s.categoryBlock}>
                <p className={s.categoryHeader}>Fruits</p>
                <div className={s.categoryGames}>
                    <img src={"imgs/games/SweetBananas.png"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                    <img src={"imgs/games/CherryBoom.png"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>

            <div className={s.categoryBlock}>
                <p className={s.categoryHeader}>Standard Games</p>
                <div className={s.categoryGames}>
                    <img src={"imgs/games/sss.png"} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>
        </div>
    );
};
