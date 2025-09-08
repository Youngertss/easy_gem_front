import { useState, useEffect } from "react";

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";

interface Cell {
    id: number;
    value: number;
    opened: boolean;
    rotation: number;
}

interface MineFieldProps{
    gameStarted: boolean;
    cellsList: Cell[] | [];
    turnCellHadnle: (id: number) => void;
};

export const MineField: React.FC<MineFieldProps> = ({gameStarted, cellsList, turnCellHadnle}) =>{
    return(
        <div className={s.mineFieldLayer}>
            <div className={s.mineField}>
                { cellsList.length > 0
                ? cellsList.map(cell =>{
                    return(
                        <div key={cell.id} className={s.mineCell} onClick={() => turnCellHadnle(cell.id)}>
                            {!cell.opened 
                            ? <img 
                                src="/imgs/icons/rocks.svg" 
                                style={{ transform: `rotate(${cell.rotation}deg)` }}
                                alt=""
                            />
                            : cell.value ? <img src="/imgs/icons/goldBar.svg" />
                                : <img src="/imgs/icons/bomb.svg" />
                            }
                        </div>
                    )
                }) 
                : Array.from({ length: 25 }).map((_, idx) => {
                    return (
                        <div key={idx} className={s.mineCell}>
                        <img src={"/imgs/icons/rocks.svg"} alt=""/>
                        </div>
                    );
                })
                }
            </div>
        </div>
    );
};