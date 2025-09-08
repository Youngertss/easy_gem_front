import { useState, useEffect } from "react";
import { PrizeWindow } from "./MinerPrizeWindow"

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";

interface WinData{
    lost: boolean
    income: number
    coeff: number
}


interface Cell {
    id: number;
    value: number;
    opened: boolean;
    rotation: number;
    exploded: boolean;
}

interface MineFieldProps{
    gameStarted: boolean;
    cellsList: Cell[] | [];
    turnCellHadnle: (id: number) => void;
    showPrize: boolean;
    closePrizeWindow: () => void;
    winData: WinData | null;
};

export const MineField: React.FC<MineFieldProps> = ({
    gameStarted, cellsList, turnCellHadnle, showPrize, closePrizeWindow, winData
}) =>{
    const [cursor, setCursor] = useState("url('/imgs/icons/pickaxe_up.png') 2 18, pointer");
    

    return(
        <div className={s.mineFieldLayer}>
            <div
                className={s.mineField}
                style={gameStarted ? { cursor } : {cursor: "pointer"}}
                onMouseDown={() => {
                    if (gameStarted) {
                    setCursor("url('/imgs/icons/pickaxe_down.png') 2 20, pointer");
                    }
                }}
                onMouseUp={() => {
                    if (gameStarted) {
                    setCursor("url('/imgs/icons/pickaxe_up.png') 2 18, pointer");
                    }
                }}
            >
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
                            : cell.value ? <div className={s.goldBarLayer}><img src="/imgs/icons/goldBar.svg" /></div>
                                : !cell.exploded ? <div className={s.bombLayer}><img src="/imgs/icons/time-bomb.png" /></div>
                                    : <div className={s.blastLayer}><img src="/imgs/icons/blast.png" /></div>
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
            {showPrize ? <PrizeWindow winData={winData} closePrizeWindow={closePrizeWindow}/> : ""}
            </div>
        </div>
    );
};