import React from "react";
import style from './timer.module.css' 


function TimerCard({timer}){
    return (
        <div className={style.timer}>Timer : {timer}</div>
    )
}

export default TimerCard; 