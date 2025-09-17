import s from "./Stats.module.scss"

export const Stats = () => {
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
                                <img src={"/imgs/games/MinerPic.png"}/>
                                <p style={{"color":"rgba(171, 171, 171, 1)"}}>Pre-pro vasyaa</p>
                                <div className={s.top3StatsBlock}>
                                    <div>
                                        <p style={{"color":"rgba(222, 222, 222, 1)"}}>314,000$</p>
                                        <p>Money earned</p>
                                    </div>
                                    <div>
                                        <p style={{"color":"rgba(222, 222, 222, 1)"}}>2,173</p>
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
                                <img src={"/imgs/games/MinerPic.png"}/>
                                <p style={{"color":"rgba(254, 229, 90, 1)"}}>Pro vasyaa</p>
                                <div className={s.top3StatsBlock}>
                                    <div>
                                        <p style={{"color":"rgba(255, 238, 143, 1)"}}>314,000$</p>
                                        <p>Money earned</p>
                                    </div>
                                    <div>
                                        <p style={{"color":"rgba(255, 238, 143, 1)"}}>2,173</p>
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
                                <img src={"/imgs/games/MinerPic.png"}/>
                                <p style={{"color":"rgba(172, 124, 103, 1)"}}>Just vasyaa</p>
                                <div className={s.top3StatsBlock}>
                                    <div>
                                        <p style={{"color":"rgba(173, 149, 139, 1)"}}>314,000$</p>
                                        <p>Money earned</p>
                                    </div>
                                    <div>
                                        <p style={{"color":"rgba(176, 149, 139, 1)"}}>2,173</p>
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
                        <div className={s.leaderboardItem}>
                            <span>4</span>
                            <img src={"/imgs/games/MinerPic.png"} />
                            <div className={s.leaderboardInfo}>
                                <a>Youngerts</a>
                                <div>  
                                    <p>Money earned: 175$</p>
                                    <p>Games played: 24</p>
                                </div>  
                            </div>
                        </div>
                        <div className={s.leaderboardItem}>
                            <span>5</span>
                            <img src={"/imgs/games/MinerPic.png"} />
                            <div className={s.leaderboardInfo}>
                                <a>Youngerts</a>
                                <div>  
                                    <p>Money earned: 175$</p>
                                    <p>Games played: 24</p>
                                </div>  
                            </div>
                        </div>
                        <div className={s.leaderboardItem}>
                            <span>6</span>
                            <img src={"/imgs/games/MinerPic.png"} />
                            <div className={s.leaderboardInfo}>
                                <a>Youngerts</a>
                                <div>  
                                    <p>Money earned: 175$</p>
                                    <p>Games played: 24</p>
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>

                
                <div className={s.siteStatisticBlock}>
                    <h3>General site statstic</h3>
                    <div className={s.siteStatistic}>
                        <div>
                            <p>Money earned: <b>784,132$</b></p>
                            <p>Games played: <b>12,736</b></p>
                        </div>
                        <div>
                            <p>Money earned today:</p>
                            <p><b>12,006$</b></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}