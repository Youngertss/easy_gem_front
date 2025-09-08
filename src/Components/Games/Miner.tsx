import { useState, useRef, useEffect } from "react";
import { MineField } from "./MineField"
import { MinerSettings } from "./MinerSettings"

import axios from "axios";
import s from "./Miner.module.scss";
import { useUserStore } from "../../store/userStore";

interface Cell {
    id: number;
    value: number;
    opened: boolean;
    rotation: number;
}

export const Miner = () => {
    const user = useUserStore((set) => (set.user));

    const [cellsList, setCellsList] = useState<Cell[]>([]);
    const [coefList, setCoefList] = useState([]);
    //game settings
    const [gameStarted, setGameStarted] = useState(false);
    const [bombsCount, setBombsCount] = useState<number>(3);
    const [currBet, setCurrBet] = useState<number>(5);
    // scroll states
    const scrollRef = useRef<HTMLDivElement>(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);


    useEffect(() =>{
        const fetchGameData = async () => {
            try{
                const { data } = await axios.get("games/get_game", {
                    params: {
                        id: 3
                    },
                    headers: {
                        "Content-Type": "application/json",
                        withCredentials: true
                    }
                });
                const data_coefList = data.data.coefficients[bombsCount.toString()];
                // console.log(data_coefList);
                setCoefList(data_coefList);
            } catch (e){
                console.log("Error while fetching Miner gameData",e)
            }
        };

        fetchGameData();
    }, [bombsCount])

    const turnCellHadnle = (id: number) => {
        setCellsList(prev =>
            prev.map((cell, idx) =>
                idx === id ? { ...cell, opened: true } : cell
            )
        );

        if (!cellsList[id].value) {
            endGameHandle(false);
        }
    };

    //settings functions START
    const startGameHandle = async () => {
        if (gameStarted) return;
        try{
            const data_to_send = {
                "sum_bet": currBet,
                "bombs_count": bombsCount
            };
            const response = await axios.get("/games/start_miner_event", {
                params: data_to_send,
                withCredentials: true
            });
            setCellsList(response.data.cells);
        } catch(e){
            console.log("error while startin Miner game", e)
        }

        setGameStarted(true);
    };

    const endGameHandle = async (isWinner: boolean) => {
        if (!gameStarted) return;

        let coefficient = -1
        if (isWinner){
            const openedCount = cellsList.filter(cell => cell.opened).length;
            if (!openedCount){
                alert("You have to choose at least 1 cell");
                return;
            }
            coefficient = coefList[(openedCount-1)]
            alert("You have won, congruts!")
        } else{
            alert("You LOST OH NOOOOOO")
        };

        const data_to_send = {
            "sum_bet": currBet,
            "coefficient": coefficient,
            "bombs_count": bombsCount
        }
        console.log("data_to_send Miner:", data_to_send)


        setCellsList(prev =>
            prev.map((cell) =>
                ({ ...cell, opened: true })
            )
        );
        setGameStarted(false);
    };

    const selectCountBombs = (count: number) => {
        setBombsCount(count);
    }

    const selectCurrBet = (bet: number, inputBetRef: HTMLInputElement | null) => {
        if (!user || !inputBetRef) return;
        if (gameStarted) {
            inputBetRef.value = `${currBet}`;
            return
        }
        let newBet = bet;
        if (bet < 5) newBet = 5;
        else if (user.balance < bet) newBet = user.balance;

        inputBetRef.value = `${newBet}`;
        setCurrBet(newBet);
    };
    //settings functions END

    // Scroll code block START
    const checkScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        if (bombsCount==20){
            setShowLeft(false);
            setShowRight(false);
        }

        const { scrollLeft, scrollWidth, clientWidth } = el;

        setShowLeft(scrollLeft > 0);
        setShowRight(scrollLeft + clientWidth < scrollWidth-5);
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.scrollLeft=0;
        checkScroll(); // проверить при монтировании
        window.addEventListener("resize", checkScroll); // при изменении ширины окна
        return () => window.removeEventListener("resize", checkScroll);
    }, [coefList]);

    const scroll = (dir: "left" | "right") => {
        if (!scrollRef.current) return;
        const offset = 100; // шаг скролла
        scrollRef.current.scrollBy({
        left: dir === "left" ? -offset : offset,
        behavior: "smooth",
        });
    };
    // Scroll code block END

    return (
        <div className={s.pageLayer}>
            <div className={s.minerGameLayer}>
                <div className={s.minerPlayBlock}>
                    <div className={s.mineBlock}>
                        <MineField gameStarted={gameStarted} cellsList={cellsList} turnCellHadnle={turnCellHadnle}/>
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
                    {/*  COEFFICIENTS BEGINNING */}
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
                            {coefList.map((coef, i) => (
                            <div key={i}>
                                <p>x{coef}</p>
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
                    {/*  COEFFICIENTS ENDING */}
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