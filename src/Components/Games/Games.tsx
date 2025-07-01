import React from 'react';
import { useNavigate  } from 'react-router-dom';

import s from "./GamesMenu.module.scss"
import SweetBananas from "../../imgs/gamesPictures/SweetBananas.png";
import sss from "../../imgs/gamesPictures/sss.png";
import CherryBoom from "../../imgs/gamesPictures/CherryBoom.png";
import FortuneWheelPic from "../../imgs/gamesPictures/FortuneWheelPic.jpg";

interface UserData{
    id: number;
    email: string;
    username: string;
    balance: string;
    photo: string;
}

interface Props{
    userData: UserData | null;
    openLoggining: () => void;
}

export const Games: React.FC<Props> = ({userData, openLoggining}) => {
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
                    <img src={FortuneWheelPic} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheel")}/>
                    <img src={SweetBananas} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                    <img src={sss} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>

            <div className={s.categoryBlock}>
                <p className={s.categoryHeader}>Fruits</p>
                <div className={s.categoryGames}>
                    <img src={SweetBananas} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                    <img src={CherryBoom} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>

            <div className={s.categoryBlock}>
                <p className={s.categoryHeader}>Standard Games</p>
                <div className={s.categoryGames}>
                    <img src={sss} className={s.gamePicture} onClick={() => handleGameClick("/FortuneWheelPic")}/>
                </div>
            </div>
        </div>
    );
};
