import React, { useRef, useState, useEffect } from 'react';
import s from "./Chat.module.scss"

import { useUserStore } from '../../store/userStore';

type ChatMessage = { author: string; message: string; time_sent?: string };

export const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messageInput = useRef(null)
    const user = useUserStore((state) => state.user)
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
        wsRef.current = ws;

        ws.onopen = () => console.log("WebSocket connection established");

        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(typeof e.data === "string" ? e.data : String(e.data));
                if (data?.author && data?.message) {
                    setMessages((prev) => [...prev, data]);
                }
            } catch (err) {
                console.error("Failed to parse WS message:", e.data, err);
            }
        };

        ws.onerror = (err) => console.error("WS error", err);
        ws.onclose = () => console.log("WS closed");

        return () => ws.close(); // clean up
    }, []);

    const sendMessageHandler = () => {
        if (!user) {
            alert("First sign up to use the chat");
            return;
        }
        if (messageInput.current) {
            const input = messageInput.current as HTMLInputElement;
            const ws = wsRef.current;
            const text = input.value.trim();
            if (!ws || ws.readyState !== WebSocket.OPEN || !text) return;
            
            const data = { "message": input.value, "author": user.username };
            console.log("Data to send:", data);
            ws.send(JSON.stringify(data));
            input.value = "";
        }
    };
    return (
        <div className={s.chatLayer}>
            <div id="chatBlock" className={s.chatBlock}>
                <div className={s.message}>
                    <u><b><a className={s.messageAuthor}>Server</a></b></u><b>:</b><span>Don't forget to be polite. Have a fun!</span>
                </div>

                {messages.map((msg, index) => (
                    <div key={index} className={s.message}>
                        <b><a className={s.messageAuthor}>{msg.author}:</a></b><span>{msg.message}</span>
                    </div>
                ))}
            </div>
            {/* Send a message */}
            <div className={s.sendMessageBlock}>
                <input type="text" ref={messageInput} onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        sendMessageHandler();
                    }
                }} />
                <img src={`/imgs/icons/sendMessageIcon.png`} alt="send" onClick={sendMessageHandler} />
            </div>

        </div>
    );
};
