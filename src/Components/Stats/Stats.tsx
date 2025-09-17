import s from "./Stats.module.scss";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

import axios from "axios";

type Leaders = {
    id: number;
    username: string;
    total_earned: number;
    photo: string;
    total_played: number;
    
    created_at: string;
  // добавь сюда остальные поля, если есть
};

interface Statistic {
    id: number;
    total_earned: number;
    total_earned_today: number;
    total_played: number;
}

export const Stats = () => {
    const [leaderboard, setLeaderboard] = useState<Leaders[]>([]);
    const [siteStatistic, setSiteStatistic] = useState<Statistic| null>(null);


    useEffect (() =>{
        const fetchLeaderboard = async () =>{
            try{
                const response = await axios.get("/statistics/get_leaderboard", {
                    withCredentials: true
                });
                setLeaderboard(response.data.leaderboard)
            } catch(e){
                console.log("erro while fetching leaderboard:", e)
            }
        };

        const fetchSiteStatistic = async () =>{
            try{
                const response = await axios.get("/statistics/get_site_statistic", {
                    withCredentials: true
                });
                setSiteStatistic(response.data)
            } catch(e){
                console.log("erro while fetching siteStatistic:", e)
            }
        };


        fetchLeaderboard();
        fetchSiteStatistic();
    }, [])


    return(
        <div className={s.initLayer}>
            <img className={s.lightLeft} src={"/imgs/icons/spotlight.svg"}/>
            <img className={s.lightRigth} src={"/imgs/icons/spotlight.svg"}/>
            
            <div className={s.layer}>
                <h2>The best players of all time</h2>
                <div className={s.top3LeadersLayer}>
                    <div className={s.top3Leaders}>

                        <div className={s.secondPlace}>
                            <div className={s.top3LeaderInfoBlock}>
                                <img src={leaderboard[1]?.photo ? "/imgs/users_avatars/"+leaderboard[1].photo : ""} alt="No more users"/>
                                <NavLink to={`/profile/${leaderboard[1]?.username}`} style={{"color":"rgba(171, 171, 171, 1)"}}>{leaderboard[1]?.username ?? "-"}</NavLink>
                                <div className={s.top3StatsBlock}>
                                    <div>
                                        <p style={{"color":"rgba(222, 222, 222, 1)"}}>
                                            {leaderboard[1]?.total_earned ?
                                            
                                            new Intl.NumberFormat("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(Number(leaderboard[1].total_earned))

                                            : "-"}$
                                            </p>
                                        <p>Money earned</p>
                                    </div>
                                    <div>
                                        <p style={{"color":"rgba(222, 222, 222, 1)"}}>{leaderboard[1]?.total_played ?? "-"}</p>
                                        <p>Games played</p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.leaderPodium}>
                                <img className={s.placeTrophy} src={"/imgs/icons/trophy2.svg"}/>
                                <img className={s.placeOnTrophy} src={"/imgs/icons/num2.png"}/>
                            </div>
                        </div>

                        <div className={s.firstPlace}>
                            <div className={s.top3LeaderInfoBlock}>
                                <img src={leaderboard[0]?.photo ? "/imgs/users_avatars/"+leaderboard[0].photo : ""} alt="No more users"/>
                                <NavLink to={`/profile/${leaderboard[0]?.username}`} style={{"color":"rgba(254, 229, 90, 1)"}}>{leaderboard[0]?.username ?? "-"}</NavLink>
                                <div className={s.top3StatsBlock}>
                                    <div>
                                        <p style={{"color":"rgba(255, 238, 143, 1)"}}>
                                            {leaderboard[0]?.total_earned ?
                                            
                                            new Intl.NumberFormat("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(Number(leaderboard[0].total_earned))

                                            : "-"}$
                                            </p>
                                        <p>Money earned</p>
                                    </div>
                                    <div>
                                        <p style={{"color":"rgba(255, 238, 143, 1)"}}>{leaderboard[0]?.total_played ?? "-"}</p>
                                        <p>Games played</p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.leaderPodium}>
                                <img className={s.placeTrophy} src={"/imgs/icons/trophy1.svg"}/>
                                <img className={s.placeOnTrophy} src={"/imgs/icons/num1.png"}/>
                            </div>
                        </div>

                        <div className={s.thirdPlace}>
                            <div className={s.top3LeaderInfoBlock}>
                                <img src={leaderboard[2]?.photo ? "/imgs/users_avatars/"+leaderboard[2].photo : ""} alt="No more users"/>
                                <NavLink to={`/profile/${leaderboard[2]?.username}`} style={{"color":"rgba(172, 124, 103, 1)"}}>{leaderboard[2]?.username ?? "-"}</NavLink>
                                <div className={s.top3StatsBlock}>
                                    <div>
                                        <p style={{"color":"rgba(173, 149, 139, 1)"}}>
                                            {leaderboard[2]?.total_earned ?
                                            
                                            new Intl.NumberFormat("en-US", {
                                                minimumFractionDigits: 2,
                                                maximumFractionDigits: 2
                                            }).format(Number(leaderboard[2].total_earned))

                                            : "-"}$
                                            </p>
                                        <p>Money earned</p>
                                    </div>
                                    <div>
                                        <p style={{"color":"rgba(173, 149, 139, 1)"}}>{leaderboard[2]?.total_played ?? "-"}</p>
                                        <p>Games played</p>
                                    </div>
                                </div>
                            </div>
                            <div className={s.leaderPodium}>
                                <img className={s.placeTrophy} src={"/imgs/icons/trophy3.svg"}/>
                                <img className={s.placeOnTrophy} src={"/imgs/icons/num3.png"}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.leaderboardLayer}>
                    <div className={s.leaderboard}>
                    {leaderboard.slice(3).map((leader, idx) => {
                        return(
                            <div className={s.leaderboardItem}>
                                <span>{idx+4}</span>
                                <img src={"/imgs/users_avatars/"+leader.photo} />
                                <div className={s.leaderboardInfo}>
                                    <NavLink to={"/profile/"+leader.username}>{leader.username}</NavLink>
                                    <div>  
                                        <p>Money earned: {leader.total_earned}$</p>
                                        <p>Games played: {leader.total_played}</p>
                                    </div>  
                                </div>
                            </div>
                        )
                    })}
                    </div>
                </div>

                
                <div className={s.siteStatisticBlock}>
                    <h3>General site statstic</h3>
                    <div className={s.siteStatistic}>
                        <div>
                            <p>Money earned: <b>{siteStatistic?.total_earned}$</b></p>
                            <p>Games played: <b>{siteStatistic?.total_played}</b></p>
                        </div>
                        <div>
                            <p>Money earned today:</p>
                            <p><b>{siteStatistic?.total_earned_today}$</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}