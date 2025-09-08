import React from 'react';
import s from "./Miner.module.scss"

interface WinData{
    lost: boolean
    income: number
    coeff: number
}

interface Props{
    winData: WinData | null;
    closePrizeWindow: () => void;
}

export const PrizeWindow: React.FC<Props> = ({winData, closePrizeWindow}) => {
    const handleTakeItButton = () =>{
        closePrizeWindow();
    }
    if (!winData){
        return (<p>NO WIN DATA ERROR</p>)
    }

    if (winData.lost){
        return(
            <div className={s.prizeBlockOverlay} onClick={closePrizeWindow}>
                <div className={s.prizeBlockLost} onClick={(e) => e.stopPropagation()}>
                    <div style={{"marginTop":"-20px"}}><p>You lost</p></div>
                    <div><p>But it was close to x{winData.coeff} and {winData.income}$ up</p></div>
                    <div className={s.buttonPrize}>
                        <button className={s.lost} onClick={handleTakeItButton}>Take it</button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className={s.prizeBlockOverlay} onClick={closePrizeWindow}>
            <div className={s.prizeBlock} onClick={(e) => e.stopPropagation()}>
                {winData.coeff >= 20 ?
                    <div><p style={{"marginTop": "-15px", "fontSize":"20px", "color":"rgba(218, 226, 0, 1)"}}>Holy crab! What a luck of you!</p></div>
                    : ""
                }
                <div><p className={`${winData.coeff >= 20 ? s.bigCoeff: ""}`} >You got <span className={s.fantasy}>x{winData.coeff}</span> and won <span className={s.fantasy}>{winData.income}$</span> !</p></div>
                <div className={s.buttonPrize}>
                    <button onClick={handleTakeItButton}>Take it</button>
                </div>
            </div>
        </div>
    );
};