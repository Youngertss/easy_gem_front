import React, { useEffect, useState, useRef } from "react";
import s from "./Profile.module.scss";
import { NavLink } from 'react-router-dom';

import axios from "axios";

interface UserData {
    id: number;
    email: string;
    username: string;
    balance: number;
    photo: string;
    favorite_game_id: number;
    total_withdrawn: number;
    total_withdrawals: number;
    created_at: string;
};


interface UserHistoryProps{
    profileUser: UserData
};

interface ExtraData{
    coefficient: number | null;
    bombs_count: number | null;
};

interface GameData {
    id: number;
    name: string;
    photo: string;
    game_type: string;
    created_at: string;
    data: Record<string, any>;
}

interface GameHistoryItem {
    id: number;
    user_id: number;
    game_id: number;
    bet: number;
    income: number;
    played_at: string;
    extra_data: ExtraData | null
    game: GameData;
}

export const UserHistory: React.FC<UserHistoryProps> = ({ profileUser }) => {
    const [userHistory, setUsetHistory] = useState<GameHistoryItem[]>([]);
    const [lastId, setLastId] = useState<number | null>(null);
    const [hasMore, setHasMore] = useState(false);

    const loadMoreHistory = async () => {
        if (!hasMore) return;

        try {
            const response = await axios.get("/games/get_user_history/"+profileUser.id, {
                params: {
                    "last_id": lastId
                },
                withCredentials: true,
            });
            console.log("History from back", response.data);

            const history = response.data.history
            setLastId(history.length ? history[history.length - 1].id : null)
            setHasMore(response.data.has_more)

            setUsetHistory(prevHistory => [...prevHistory, ...history]);
        } catch (e) {
            console.log("Error while loading more userHistory", e)
        }
    };

    useEffect(() => {
        const fetchUserHistory = async () => {
            try {
                const response = await axios.get("/games/get_user_history/"+profileUser.id, {
                    withCredentials: true,
                });
                console.log("History from back", response.data);

                const history = response.data.history
                setLastId(history.length ? history[history.length - 1].id : null)
                setHasMore(response.data.has_more)

                setUsetHistory(history);
            } catch (e) {
                console.log("Error while fetching userHistory", e)
            }
        };

        fetchUserHistory();
    }, [profileUser])

    return (
        <div className={s.userHistory}>
            { userHistory && userHistory.length > 0 &&
                <div className={s.historyItem}>
                    <div className={s.gameHistoryRow}><p style={{ marginBottom: "10px" }}>History</p></div>
                    <div className={s.gameIncomeRow}><p style={{marginBottom: "10px"}}>Income</p></div>
                </div>
            }
            {userHistory && userHistory.length > 0 ? userHistory.map((item, index) => (
                <div key={index} className={s.historyItem}>
                    <div className={s.gameHistoryRow}>
                        <div className = {s.gameHistoryInfo}>
                            <img src={"/imgs/games"+item.game.photo} className={s.profileGamePic}/>
                            <div style={{"minWidth": "150px", "marginRight": "5%"}}>
                                <NavLink to={"/" + item.game.name}>{item.game.name}</NavLink>
                            </div>
                            <div style={{"minWidth": "100px", "marginRight": "15%"}}>
                                <p style={{color: "rgba(28, 154, 221, 1)"}}>{item.bet}$</p>
                            </div>
                            <div className={s.extraData}>
                                {item.income > item.bet 
                                ? <div className={s.coef}>x{item.extra_data?.coefficient}</div>
                                : <div className={s.coefRed}>x{0}</div>
                                }
                                { item.extra_data?.bombs_count 
                                   ? <div className={s.bombs_count}><p>{item.extra_data?.bombs_count}</p><img src={"/imgs/icons/bomb.svg"}/></div>
                                   : ""
                                }
                            </div>
                        </div>
                    </div>
                    <div className={s.gameIncomeRow}>
                        <div className={s.incomeInfo}>
                            {item.income > item.bet
                                ? <p style={{ color: "lightgreen" }}>+{item.income}$</p>
                                : item.income === item.bet 
                                    ? <p style={{ color: "orange" }}>+{item.income}$</p> 
                                    :<p style={{ color: "red" }}>+{item.income}$</p> 
                            }
                        </div>
                    </div>
                </div>
            ))
                : null}
            {hasMore
            ? <div className={s.loadMore}><button onClick={loadMoreHistory}>Load more...</button></div>
            : null
            }
        </div>
    )
};