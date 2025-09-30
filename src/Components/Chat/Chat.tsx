import React, { useRef, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import s from "./Chat.module.scss"

import { useUserStore } from '../../store/userStore';

type ChatMessage = { author: string; message: string; time_sent?: string };

interface ChatParams{
    openLoggining: () => void;
}

export const Chat: React.FC<ChatParams> = ({ openLoggining }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const messageInput = useRef(null)
    const user = useUserStore((state) => state.user)
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
                } else if (data?.messages && data.messages.length !== 0) { // initially loads history of last messages
                    let data_to_chat = data.messages.reverse()
                    data_to_chat = [
                    ...data_to_chat,
                    { author: "CHATBOT", message: "Don't forget to be polite. Have fun!" }
                    ]
                    setMessages(data_to_chat)
                };
            } catch (err) {
                console.error("Failed to parse WS message:", e.data, err);
            }
        };

        ws.onerror = (err) => console.error("WS error", err);
        ws.onclose = () => console.log("WS closed");

        return () => ws.close(); // clean up
    }, [user?.username]);

    useEffect(() => {
        const interval = setInterval(() => {
            const mLength = messages.length;
            let flag = true;
            for (let i: number = 0; i < 5; i++){
                if (messages[mLength-i-1].author == "CHATBOT"){
                    flag=false;
                    break;
                }
            };
            if (flag){
                setMessages(prev => [...prev, {author: "CHATBOT", message: "Don't forget to be polite. Have fun!"}])
            };
        }, 5 * 60 * 1000); // 5 mins

        return () => clearInterval(interval); 
    }, []);

    const sendMessageHandler = () => {
        if (!user) {
            openLoggining();
            return;
        }
        if (messageInput.current) {
            const input = messageInput.current as HTMLInputElement;
            const ws = wsRef.current;
            const text = input.value.trim();
            if (!ws || ws.readyState !== WebSocket.OPEN || !text) return;
            
            const data = { "message": input.value, "author": user.username, "timestamp": new Date().toISOString() };
            // console.log("Data to send:", data);
            ws.send(JSON.stringify(data));

            input.value = "";
        }
    };
    return (
        <div className={s.chatLayer}>
            <div id="chatBlock" className={s.chatBlock}>
                <div className={s.message}>
                    <u><b><a>Server</a></b></u><b>:</b><span>Don't forget to be polite. Have a fun!</span>
                </div>

                {messages.map((msg, index) => (
                    <div key={index} className={s.message}>
                        {msg.author === "CHATBOT" ? (
                        <>
                            <b><u>Server</u>:</b><span>{msg.message}</span>
                        </>
                        ) : (
                        <>
                            <b>
                            <NavLink className={s.authorName} to={`/profile/${msg.author}`}>
                                {msg.author}
                            </NavLink>:
                            </b>
                            <span>{msg.message}</span>
                        </>
                        )}
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
