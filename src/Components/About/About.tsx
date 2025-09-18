import React from 'react';

import s from "./About.module.scss"

export const About = () => {
    return (
        <div className={s.layer}>
            <div className={s.aboutBlock}>
                <div className={s.patrickBlock}>
                    <img src={"/imgs/icons/Patrick.png"} alt=""/>
                </div>

                <img className={s.Squidward} src={"/imgs/icons/Squidward.png"} alt="" />

                <div className={s.aboutSite}>
                    <p>About site</p>

                    <p>Kind of casino site which is working mainly on frameworks such as React (frontend) and Fastapi (beckend)</p>
                </div>

                <div className={s.aboutAuthor}>
                    <p>About author</p>

                    <p>Just turned 18, in 2025 started Computer Science studies in Poland. Programming in general was a hobby since 2020.<i> The goal is to become a web developer (mainly beckend)</i></p>
                </div>

                <div className={s.contacts}>
                    <p>Contacts</p>

                    <p>Github: <a href="https://github.com/Youngertss" target="_blank" rel="noopener noreferrer">
                            https://github.com/Youngertss
                        </a>
                    </p>

                    <p>Telegram: @youngertss (
                        <a href="https://t.me/youngertss" target="_blank" rel="noopener noreferrer">
                            https://t.me/youngertss
                        </a>
                        )</p>

                    <p>Leetcode: <a href="https://leetcode.com/youngerts/" target="_blank" rel="noopener noreferrer">
                             https://leetcode.com/youngerts/
                        </a>
                    </p>
                </div>

                <div className={s.quotes}>
                    <p><i>It does not matter how slowly you go as long as you do not stop.</i> - Confucius</p>
                </div>
                
            </div>
        </div>
        )
};
