import React from 'react';

import s from "./Bonuses.module.scss"

export const Bonuses = () => {
    return(
        <div className={s.layer}>
            {/* img presents abs */}
            {/* help info if hold */}
            <div className={s.bonusesBlock}>

                <div className={s.superBonusBlock}>
                    <h2>Super bonuse</h2>
                    <div className={s.claimBonuseSuper}>
                        <p>Take it!</p>
                    </div>
                    <div className={s.userClaimed}>
                        <p>youngerts has claimed last bonuse</p>
                    </div>
                </div>

                <div className={s.ordinaryBonusBlock}>
                    <h2>Ordinary bonuse</h2>
                    <div className={s.claimBonuse}>
                        <p>Take it!</p>
                    </div>
                    <div className={s.userClaimed}>
                        <p>you've already have this bonuse or higher</p>
                    </div>
                </div>
            </div>
        </div>
    )
};
