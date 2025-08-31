import { useState, useEffect } from "react";

import s from "./Games.module.scss";
import { useUserStore } from "../../store/userStore";

export const Miner = () => {
    return (
        <div className={s.pageLayer}>
            <div className={s.minerGameLayer}>
                <div className={s.minerPlayBlock}>
                    <div className={s.mineBlock}>
                        <div className={s.mineField}>
                            <p>Here will be field</p>
                        </div>
                    </div>
                    <div className={s.buttonStartBlock}>
                        <button>Mine</button>
                    </div>
                </div>
                <div className={s.minerSettingsBlock}>
                    <h3>Settings</h3>
                    <p>Betsum</p>
                    <p>Count of bombs</p>
                    <h4>Condition - win sum:</h4>
                    <p>X</p>
                </div>
            </div>
        </div>
    );
};