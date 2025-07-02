import React, { useState, useRef, useEffect } from 'react';
import s from "../Games.module.scss";
import axios from "axios";

interface Props{
    labels: string[];
    sectorAngle: number;
    angle: number;
    spinWheelTest: () => void
}

const colors=["#9966FF", "#C9CBCF", "#FF6384", "#FFCE56", "#00A877"]

export const FortuneWheelCanvas: React.FC<Props> = ({labels, sectorAngle, angle, spinWheelTest}) =>{
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Drawin the wheel
    const drawWheel = (context: CanvasRenderingContext2D, currentAngle: number) => {
        const centerX = context.canvas.width / 2;
        const centerY = context.canvas.height / 2;
        const radius = 150; //also the length of borders in sectors

        context.clearRect(0, 0, context.canvas.width, context.canvas.height);

        for (let i = 0; i < labels.length; i++) {
            const start = (i * sectorAngle + currentAngle) * Math.PI / 180;
            const end = ((i + 1) * sectorAngle + currentAngle) * Math.PI / 180;

            // Sector
            context.beginPath();
            context.moveTo(centerX, centerY);
            context.arc(centerX, centerY, radius, start, end);

            //choose a color for sector
            const currPrize = parseInt(labels[i].slice(0, -1));
            let currColor = colors[3]; //jackpot - yellow

            if (currPrize < 5 ){
                currColor = colors[1]; //grey
            }  else if(currPrize===5){
                currColor = colors[2]; //red
            } else if (currPrize <= 20){
                currColor = colors[4]; //green
            } else if (currPrize <= 100){
                currColor = colors[0]; //purple
            }

            context.fillStyle = currColor;
            context.fill();
            context.stroke();

            // Label
            context.save();
            context.translate(centerX, centerY); //moving center back to center
            context.rotate((start + end) / 2); //rotating the text
            context.textAlign = "right";
            context.fillStyle = "black";
            context.font = "16px sans-serif";
            context.fillText(labels[i], radius - 10, 5); //gap from center
            context.restore();
        }

        // Стрелка
        context.beginPath();
        context.moveTo(centerX - 10, centerY + 2); //left point
        context.lineTo(centerX, centerY - 18); //upper point
        context.lineTo(centerX + 10, centerY + 2); //right point
        context.fillStyle = "red";
        context.fill();
    };

    //drawing a wheel basing on curr angle 
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        drawWheel(context, angle);
    }, [angle]);

    return(
        <canvas ref={canvasRef} width={400} height={400} className={s.wheel} onClick={spinWheelTest}/>
    )
}