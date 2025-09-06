import { useState, useEffect } from "react";

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";

interface MineFieldProps{
    gameStarted: boolean;
};

export const MineField: React.FC<MineFieldProps> = ({gameStarted}) =>{
    return(
        <div className={s.mineFieldLayer}>
            <div className={s.mineField}>
                {Array.from({ length: 25 }).map((_, idx) => {
                    let rotation = 0;
                    if (gameStarted){
                        rotation = Math.floor(Math.random() * 360);
                    };
                    return (
                        <div key={idx} className={s.mineCell}>
                        <img
                            src={"/imgs/icons/rocks.svg"}
                            style={{ transform: `rotate(${rotation}deg)` }}
                            alt=""
                        />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};