import { useState, useEffect } from "react";

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";

interface MineFieldProps{
    gameStarted: boolean;
};

export const MineField: React.FC<MineFieldProps> = ({gameStarted}) =>{
    return(
        <div className={s.mineField}>
            {Array.from({ length: 25 }).map((_, idx) => (
                <div key={idx} className={s.mineCell}></div>
            ))}
        </div>
    );
};