import React, {useState} from "react";
import s from "./Profile.module.scss";
import {SelectionHeader} from "./SelectionHeader"

export const Deposite = () =>{
    const [card, setCard] = useState("");
    const [MY, setMY] = useState("");
    const [CD, setCD] = useState("");
    const [sum, setSum] = useState("");


    const handleDeposite = async (e: React.FormEvent) => {
        e.preventDefault();

        setCard("");
        setMY("");
        setCD("");
        setSum("");
    }


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