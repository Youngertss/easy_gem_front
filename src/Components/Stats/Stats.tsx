import s from "./Stats.module.scss"

export const Stats = () => {
    return(
        <div className={s.initLayer}>
            <div className={s.layer}>
                <h2>Leaderboard</h2>
                <div className={s.top3LeadersLayer}>
                    <div className={s.top3Leaders}>
                        <div className={s.secondPlace}>as</div>
                        <div className={s.firstPlace}>sa</div>
                        <div className={s.thirdPlace}>fsa</div>
                    </div>
                </div>
                <div className={s.leaderboardLayer}>
                    <div className={s.leaderboard}>
                        <div>4</div>
                        <div>5</div>
                        <div>6</div>
                    </div>
                </div>
            </div>
        </div>
    )
}