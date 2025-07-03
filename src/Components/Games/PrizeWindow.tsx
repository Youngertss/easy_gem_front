import React from 'react';
import s from "./Games.module.scss"

interface Props{
    income: number;
    closeWindow: () => void;
    spinWheel: () => void;
}

export const PrizeWindow: React.FC<Props> = ({income, closeWindow, spinWheel}) => {
    const handleTakeItButton = () =>{
        closeWindow();
    }

    const handleSpinAgainButton = () =>{
        closeWindow();
        spinWheel();
    }
    return (
        <div className={s.prizeBlockOverlay} onClick={closeWindow}>
            <div className={s.prizeBlock} onClick={(e) => e.stopPropagation()}>
                {income > 501 ?
                    <div><p style={{"marginBottom": "20px", "fontSize":"44px", "color":"rgb(235, 255, 190)"}}>JACKPOT!</p></div>
                    : ""
                }
                <div><p className={`${income>501 ? s.jackpot: ""}`} >You won {income}$ !</p></div>
                <div className={s.buttons}>
                    <button onClick={handleTakeItButton}>Take it</button>
                    {income<501 ? 
                        <button 
                            style={{"color": "rgba(92, 3, 133, 0.886)"}} 
                            onClick={handleSpinAgainButton}>One more spin :{")"}
                        </button> 
                        : ""
                    }
                </div>
            </div>
        </div>
    );
};