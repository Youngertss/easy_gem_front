import { useState, useRef, useEffect } from "react";
import { MineField } from "./MineField"
import { MinerSettings } from "./MinerSettings"

import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";


export const Miner = () => {
    const user = useUserStore((set) => (set.user));
    //game settings
    const [gameStarted, setGameStarted] = useState(false);
    const [bombsCount, setBombsCount] = useState<number>(3);
    const [currBet, setCurrBet] = useState<number>(5);
    // scroll states
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);

    const startGameHandle = () => {
        if (gameStarted) return;
        setGameStarted(true);
    };

    const endGameHandle = () => {
        if (!gameStarted) return;
        setGameStarted(false);
    };

    const selectCountBombs = (count: number) => {
        setBombsCount(count);
    }

    const selectCurrBet = (bet: number, inputBetRef: HTMLInputElement | null) => {
        if (!user || !inputBetRef) return;

        let newBet = bet;
        if (bet < 5) newBet = 5;
        else if (user.balance < bet) newBet = user.balance;

        inputBetRef.value = `${newBet}`;
        setCurrBet(newBet);
        };

    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth-5);
    };

    useEffect(() => {
        checkScroll(); // проверить при монтировании
        window.addEventListener("resize", checkScroll); // при изменении ширины окна
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const offset = 200; // шаг скролла
        scrollRef.current.scrollBy({
        left: dir === "left" ? -offset : offset,
        behavior: "smooth",
        });
    };

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
                                        <p>{25-bombsCount}</p>
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
                                        <p>{bombsCount}</p>
                                    </div>
                                    <img src={"/imgs/icons/tnt.svg"} />
                                    <div className={s.glowBlock}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={s.coefficientsWrapper}>
                        {showLeft && (
                            <img
                            src={"/imgs/icons/angle-small-left.svg"}
                            className={`${s.scrollBtn} ${s.left}`}
                            onClick={() => scroll("left")}
                            >
                            </img>
                        )}

                        <div
                            ref={scrollRef}
                            onScroll={checkScroll}
                            className={s.coefficientsInfo}
                        >
                            {Array.from({ length: 22 }).map((_, i) => (
                            <div key={i}>
                                <p>x1.{i + 1}</p>
                                <p className={s.stepNum}>{i + 1} step</p>
                            </div>
                            ))}
                        </div>

                        {showRight && (
                            <img
                            src={"/imgs/icons/angle-small-right.svg"}
                            className={`${s.scrollBtn} ${s.right}`}
                            onClick={() => scroll("right")}
                            >
                            </img>
                        )}
                    </div>
                </div>
                <MinerSettings
                    gameStarted={gameStarted} bombsCount={bombsCount}
                    currBet={currBet} startGameHandle={startGameHandle}
                    endGameHandle={endGameHandle} selectCountBombs={selectCountBombs}
                    selectCurrBet={selectCurrBet}
                />
            </div>
        </div>
    );
};