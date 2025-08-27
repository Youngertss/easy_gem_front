import React, { useRef, useState, useEffect } from 'react';
import s from "./Chat.module.scss"

import { useUserStore } from '../../store/userStore';
import { timeStamp } from 'console';

type ChatMessage = { author: string; message: string; time_sent?: string };

export const Chat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messageInput = useRef(null)
    const user = useUserStore((state) => state.user)
    const fetchUser = useUserStore((state) => state.fetchUser)
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        if (!user) {
            console.log("No authorization - no websocket to chat")
            return;
        };
        const ws = new WebSocket(`ws://127.0.0.1:8000/ws/chat/`);
        wsRef.current = ws;

        ws.onopen = () => {
            console.log("WebSocket connection established");
            const auth_data = { "user_id": user.id, "username": user.username };
            ws.send(JSON.stringify(auth_data));
            setMessages([]);
        };

        ws.onmessage = (e) => {
            try {
                const data = JSON.parse(typeof e.data === "string" ? e.data : String(e.data));
                console.log("Received WS message:", data);
                if (data?.author && data?.message) {
                    setMessages((prev) => [...prev, data]);
                } else if (data?.messages && data.messages.length !== 0) {
                    let data_to_chat = data.messages.reverse()
                    setMessages((prev) => [...prev, ...data_to_chat])
                };
            } catch (err) {
                console.error("Failed to parse WS message:", e.data, err);
            }
        };

        ws.onerror = (err) => console.error("WS error", err);
        ws.onclose = () => console.log("WS closed");

        return () => ws.close(); // clean up
    }, [user]);

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
            
            const data = { "message": input.value, "author": user.username, "timestamp": new Date().toISOString() };
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
