import { useState, useEffect, useRef } from "react";

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";

interface SettingsProps {
    gameStarted: boolean;
    bombsCount: number;
    currBet: number;
    startGameHandle: () => void;
    endGameHandle: () => void;
    selectCountBombs: (count: number) => void;
    selectCurrBet: (bet: number, inputBetRef: HTMLInputElement | null) => void;
}

export const MinerSettings: React.FC<SettingsProps> = ({
    gameStarted, bombsCount, currBet, startGameHandle, 
    endGameHandle, selectCountBombs, selectCurrBet
}) => {
    const user = useUserStore((set) => (set.user))
    const bombsCountVarients = [3,5,10,20];
    const betVarients = [5, 20, 50]
    const inputBetRef = useRef<HTMLInputElement>(null);

    return(
        <div className={s.minerSettingsBlock}>
            <div className={s.settingsHeader}><h3>Settings</h3></div>
            <div className={s.balanseBlock}>
                <div className={s.dollarBlock}>
                    <img src="/imgs/icons/wallet.svg" alt="" />
                </div>
                <div className={s.balanseSum}>
                    <p>{user?.balance}$</p>
                    <p style={{ "fontSize": "14px"   }}>Balance</p>
                </div>
            </div>
            <div className={s.bombsSelectBlock}>
                <p>Count of bombs</p>
                <div className={s.bombsSelection}>
                    <div className={s.bombsCountInfo}>
                        <img src={"/imgs/icons/bomb.svg"}/>
                        <p>{bombsCount}</p>
                    </div>
                    {/* select count of bombs */}
                    {bombsCountVarients.map((num, i) => {
                        const isSelected = num === bombsCount;
                        return (
                            <div
                                key={i}
                                className={`${s.bombsCount} ${isSelected ? s.selected 
                                    : gameStarted ? "" : s.settingsMode }`}
                                onClick={() => {
                                    if (!gameStarted) {
                                        selectCountBombs(num);
                                    }
                                }}
                            >
                                <img src={"/imgs/icons/bomb.svg"} className={s.bombInSelected} />
                                <p>{num}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={s.betSumBlock}>
                <p>Bet sum</p>
                <div className={s.betSelection}>
                    <div className={s.betSumInfo}>
                        <p>$</p>
                        <input
                            ref={inputBetRef}
                            type="number"
                            defaultValue={currBet}
                            onBlur={() => {
                            if (inputBetRef.current) {
                                const val = Number(inputBetRef.current.value);
                                selectCurrBet(val, inputBetRef.current);
                            }
                            }}
                            onKeyDown={(e) => {
                            if (e.key === "Enter" && inputBetRef.current) {
                                const val = Number(inputBetRef.current.value);
                                selectCurrBet(val, inputBetRef.current);
                                inputBetRef.current.blur();
                            }
                            }}
                        />
                        </div>
                    {betVarients.map((num, i) => {
                        const isSelected = num === currBet;
                        return (
                            <div
                                key={i}
                                className={`${s.betSum} ${isSelected ? s.selected 
                                    : gameStarted ? "" : s.settingsMode }`}
                                onClick={() => {
                                    if (!gameStarted) {
                                        selectCurrBet(num, inputBetRef.current);
                                    }
                                }}
                            >
                                <p>{num}$</p>
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className={s.buttonPlayBlock}>
                { gameStarted
                ? <button onClick={endGameHandle} className={s.endGameBtn}>
                    <p>Play</p>
                    <img src={"/imgs/icons/data-mining-outlines.svg"}/>
                </button>
                : <button onClick={startGameHandle} className={s.startGameBtn}>
                    <p>Play</p>
                    <img src={"/imgs/icons/data-mining.svg"}/>
                  </button>
                }
            </div>
        </div>
    )
}