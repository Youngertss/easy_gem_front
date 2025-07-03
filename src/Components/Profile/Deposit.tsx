import React, {useState} from "react";
import s from "./Profile.module.scss";
import {SelectionHeader} from "./SelectionHeader";
import { useUserStore } from "../../store/userStore";

import axios from "axios";

export const Deposit = () =>{
    const [card, setCard] = useState("");
    const [MY, setMY] = useState("");
    const [CD, setCD] = useState("");
    const [sum, setSum] = useState("");

    const user = useUserStore((set) => set.user);
    const setUser = useUserStore((set) => set.setUser);

    if (!user) return <p>You have to Log in</p>;


    const handleDeposite = async (e: React.FormEvent) => {
        e.preventDefault();
        let res;
        try{
            res = await axios.patch("/games/deposit",
                { sum : parseInt(sum) }, 
                {
                    withCredentials: true
                });    
            setUser({
                ...user,
                balance: user.balance + parseInt(sum)
            }); 
        } catch(error){
            console.log(error);
        }
        console.log(res);

        setCard("");
        setMY("");
        setCD("");
        setSum("");
    };


    return(
        <div className={s.profileBlock}>
            <SelectionHeader selected={"Deposite"}/>
            <hr/>

            <div className = {s.depositeFormBlock} >
                <form onSubmit={handleDeposite}>
                    <div className={s.depositForm}>
                        <input 
                            type="text" 
                            name="card"
                            value={card}
                            onChange={(e) => {
                                setCard(e.target.value)
                            }} placeholder="0000 0000 0000 0000" />

                        <div className={s.MYCVLine}>
                            <input 
                                style={{width: "50%", marginRight: "2px"}}
                                type="text" 
                                name="MY"
                                value={MY}
                                onChange={(e) => {
                                    setMY(e.target.value)
                                }} placeholder="MY"/>
                            <input 
                                style={{width: "50%"}}
                                type="text" 
                                name="CV"
                                value={CD}
                                onChange={(e) => {
                                    setCD(e.target.value)
                                }} placeholder="CV" />
                        </div>
                        <input 
                            type="text" 
                            name="sum"
                            value={sum}
                            onChange={(e) => {
                                setSum(e.target.value)
                            }} placeholder="sum $"/>
                    <button type="submit">Deposite</button>
                </div>
                </form>
            </div>
        </div>
    )
};