import { useState, } from "react";
import { MineField } from "./MineField"

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";


export const Miner = () => {
    const user = useUserStore((set) => (set.user));
    const [gameStarted, setGameStarted] = useState(false);

    return (
        <div className={s.pageLayer}>
            <div className={s.minerGameLayer}>
                <div className={s.minerPlayBlock}>
                    <div className={s.mineBlock}>
                        <MineField gameStarted={gameStarted}/>
                        <div className={s.minerGameStatusInfo}>
                            <div className={s.goldBarsStuckBlock}>
                                <div className={s.goldBarsStatusInfo}>
                                    <h4>Gold bars</h4>
                                    <p>Open the cells with gold to multiply coefficient</p>
                                    <div className={s.goldCount}>
                                        <p>22</p>
                                    </div>
                                    <img src={"/imgs/icons/goldBarsStack.svg"} />
                                    <div className={s.glowBlock}></div>
                                </div>
                            </div>
                            <div className={s.bombsBlock}>
                                <div className={s.bombsStatusInfo}>
                                    <h4>Bombs</h4>
                                    <p>Count of bombs on the field</p>
                                    <div className={s.bCount}>
                                        <p>3</p>
                                    </div>
                                    <img src={"/imgs/icons/tnt.svg"} />
                                    <div className={s.glowBlock}></div>
                                </div>
                            </div>
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
                            <div className={`${s.bombsCount} ${s.selected}`}>
                                <img src={"/imgs/icons/bomb.svg"} className={s.bombInSelected} />
                                <p>3</p>
                            </div>
                            <div className={s.bombsCount}>
                                <img src={"/imgs/icons/bomb.svg"} className={s.bombInSelected} />
                                <p>5</p>
                            </div>
                            <div className={s.bombsCount}>
                                <img src={"/imgs/icons/bomb.svg"} className={s.bombInSelected} />
                                <p>10</p>
                            </div>
                            <div className={s.bombsCount}>
                                <img src={"/imgs/icons/bomb.svg"} className={s.bombInSelected} />
                                <p>20</p>
                            </div>
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