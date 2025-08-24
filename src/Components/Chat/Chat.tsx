import React, { useRef, useState, useEffect } from 'react';
import s from "./Chat.module.scss"

import { useUserStore } from '../../store/userStore';

export const Chat = () => {
    const messageInput = useRef(null)
    const user = useUserStore((state) => state.user)

    const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
    ws.onopen = () => {
        console.log("WebSocket connection established");
    };

    ws.onmessage = (e) => {
        console.log("Message from server ", e.data);
        const messageElement = document.createElement("div");
        messageElement.className = s.message;
        
    };

    const sendMessageHandler = () => {
        if (!user) {
            alert("First sign in to use chat");
            return;
        }
        if (messageInput.current) {
            const input = messageInput.current as HTMLInputElement;
            console.log("Message to send:", input.value);
            const data = { "message": input.value, "author": user.username };
            ws.send(JSON.stringify(data));
            input.value = "";
        }
    };
    return (
        <div id="chatBlock" className={s.chatBlock}>
            <div className={s.sendMessageBlock}>
                <input type="text" ref={messageInput} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessageHandler();
                    }
                }} />
                <img src={`/imgs/icons/sendMessageIcon.png`} alt="send" onClick={sendMessageHandler} />
            </div>

            <div className={s.message}>
                <u><b><a className={s.messageAuthor}>Server:</a></b></u><span>Don't forget to be polite. Have a fun!</span>
            </div>
        </div>
    );
};
