import { useState, useEffect } from "react";

import s from "./Games.module.scss";
import { useUserStore } from "../../store/userStore";

export const Miner = () => {
    const user = useUserStore((set) => (set.user));

    return (
        <div className={s.pageLayer}>
            <div className={s.minerGameLayer}>
                <div className={s.minerPlayBlock}>
                    <div className={s.mineBlock}>
                        <div className={s.mineField}>
                            <p>Here will be field</p>
                        </div>
                        <div className={s.minerGameStatusInfo}>
                            <p>22 gold stucks</p>
                            <p>3 bombs</p>
                        </div>
                    </div>
                    <div className={s.coefficientsInfo}>
                        <div>1.2x</div><div>1.46x</div><div>1.2x</div><div>1.46x</div>
                        <div>1.2x</div><div>1.46x</div><div>1.2x</div><div>1.46x</div>
                        {/* <div>1.2x</div><div>1.46x</div><div>1.2x</div><div>1.46x</div> */}
                    </div>
                </div>
                <div className={s.minerSettingsBlock}>
                    <div className={s.settingsHeader}><h3>Settings</h3></div>
                    <div className={s.balanseBlock}>
                        <div className={s.dollarBlock}>
                            <img src="/imgs/games/dollar.png" alt="" />
                        </div>
                        <div className={s.balanseSum}>
                            <p>{user?.balance}$</p>
                            <p style={{ "fontSize": "14px" }}>Balance</p>
                        </div>
                    </div>
                    <div className={s.bombsSelectBlock}>
                        <p>Count of bombs</p>
                        <div className={s.bombsSelection}>
                            <div className={s.bombsCountInfo}>
                                <img src={"/imgs/icons/bomb.svg"}/>
                                <p>3</p>
                            </div>
                            <div className={`${s.bombsCount} ${s.selected}`}><p>3</p></div>
                            <div className={s.bombsCount}><p>5</p></div>
                            <div className={s.bombsCount}><p>10</p></div>
                            <div className={s.bombsCount}><p>20</p></div>
                        </div>
                    </div>
                    <div className={s.betSumBlock}>
                        <p>Bet sum</p>
                        <div className={s.betSelection}>
                            <div className={s.betSumInfo}>
                                <p>$</p><input type="text" defaultValue="5"/>
                            </div>
                            <div className={`${s.betSum} ${s.selected}`}><p>$5</p></div>
                            <div className={s.betSum}><p>$20</p></div>
                            <div className={s.betSum}><p>$50</p></div>
                        </div>
                    </div>
                    <div className={s.buttonPlayBlock}>
                        <button>Play</button>
                    </div>
                </div>
            </div>
        </div>
    );
};