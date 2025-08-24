import React from 'react';
import s from "./Chat.module.scss"

export const Chat = () => {
    return (
        <div className={s.chatBlock}>
            <div className={s.sendMessageBlock}>
                <input type="text" />
            </div>
            <div className={s.message}>
                <b><a className={s.messageAuthor}>youngerts:</a></b><span>Hi ewr1</span>
            </div>
            <div className={s.message}>
                <b><a className={s.messageAuthor}>lololoshka:</a></b><span>Gl gg good one</span>
            </div>
            <div className={s.message}>
                <b><a className={s.messageAuthor}>youngerts:</a></b><span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi dolorem blanditiis voluptate quasi tempore minima! Ducimus, eos. Dolorum, ipsum, nisi velit unde ad et beatae ut tempora quam officiis quos?</span>
            </div>
        </div>
    );
};
