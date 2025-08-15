import { useState, useRef } from 'react';
import axios from "axios";

import s from "./Games.module.scss";
import { useUserStore } from "../../store/userStore";

export const SafeHack = () => {
    const user = useUserStore((set)=>set.user)
    const setUser = useUserStore((set)=> set.setUser)

    const [chance, setChance] = useState(50);
    const [sumBet, setSumBet] = useState(5);
    const arrowRef = useRef<HTMLDivElement>(null);
    const [isDisabled, setIsDisabled] = useState(false);

    if (!user) return <p>error</p>


    const coefficient = (96/chance).toFixed(2);
    const expected_result = (sumBet * parseFloat(coefficient)).toFixed(2);

    const increaseChanceByOne = () => {
        if (chance < 90) setChance(chance+1);
    };
    const decreaseChanceByOne = () => {
        if (chance > 10) setChance(chance-1);
    }

    const handleChangeTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
        setChance(parseInt(e.target.value)%100);
    };


    const handleSumBet = (e: React.SyntheticEvent<HTMLInputElement>) => {
        const input = e.target as HTMLInputElement;
        const sum = parseFloat(parseFloat(input.value).toFixed(2));
    
        if (sum < 2.5) {
            input.value = "2.5";
            setSumBet(2.5);
        } else if (sum > user.balance) {
            input.value = `${user.balance}`;
            setSumBet(user.balance);
        } else {
            input.value = `${sum}`;
            setSumBet(sum);
        };

        console.log("Typed sum:", sum, " Prev:", sumBet);
    };

    const hackSubmit = async () =>{
        if (isDisabled) return;

        setIsDisabled(true); // block the next one cycle
        setTimeout(() => setIsDisabled(false), 500); // it will be unlocked in 2 secs

        const data = {
            "sum_bet": sumBet,
            "chance": chance,
            "expected_result":expected_result
        }
        let response;
        try{
            response = await axios.get(`/games/get_safe_hack_event`, {
                params: data,
                withCredentials: true
            });
        } catch (e){
            alert("Not enogh credits or another error")
        };
        if (!response) return;

        const percent = response.data.random_num;
        if (arrowRef.current) {
            arrowRef.current.style.left = `calc(${percent}% - 2.5px)`; // -2.5px для центрирования
        }

        setUser({
            ...user,
            balance: response.data.new_balance
        });
        
        console.log(response.data.won, response.data.random_num, response.data.new_balance)
    };


    return(
        <div className={s.pageLayer}>
            <div className={s.gameLayer}>

                <div className={s.visualField}>
                    <img className={s.wirefulSafe} src={`imgs/games/wireful_safe.png`} alt="safe with wires"/>
                    <div style={{"width":"100%", "display": "flex", "flexDirection": "column", "alignItems":"center", "position":"relative"}}>
                        <div className={s.chanceBar}>
                            <div style={{"width":`${chance}%`}} className={s.greenField}></div>
                            <div style={{"width":`${100 - chance}%`}} className={s.redField}></div>
                        </div>
                        <div className={s.bankArrow} ref={arrowRef}></div>

                        <p style={{"marginTop":"3px", "fontSize":"21px"}}>{chance}%</p>
                    </div>
                    <button className={s.hackButton} disabled={isDisabled} onClick={!isDisabled ? hackSubmit : undefined}>Hack!</button>
                </div>


                <div className={s.statusField}>
                    <p style={{"color":"rgb(0, 160, 0)"}}>sum bet</p>
                    <div>
                        <span>$</span>
                        <input type="number" defaultValue={sumBet} maxLength={8} className={s.sumBet}
                            onBlur={handleSumBet}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSumBet(e);
                        }}/>
                    </div>

                    <p>coefficient: x{coefficient}</p>
                    <p><b>expected result: {expected_result}$</b></p>
                    <div className={s.betChance}>
                        <button onClick={decreaseChanceByOne}>-1</button>
                        <p>{chance}%</p>
                        <button onClick={increaseChanceByOne}>+1</button>                        
                    </div>

                    <div className={s.sliderTrack}>
                        <div className={s.chanceRegulator}>
                            <div style={{"width":`${chance}%`, "backgroundColor":"rgb(0, 220, 0)"}}></div>
                            <div style={{"width":`${100 - chance}%`, "backgroundColor":"red"}}></div>
                        </div>
                        <input
                            type="range"
                            min="10"
                            max="90"
                            value={chance}
                            onChange={handleChangeTrack}
                            className={s.slider}
                            />
                    </div>
                    <p style={{"marginTop":"50px", "fontSize":"24px"}}>balance: {user?.balance}$</p>
                </div>
            </div>
        </div>
    )
};