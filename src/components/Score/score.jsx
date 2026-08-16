import React from "react";
import style from "./score.module.css" 


function ScoreCard({score}){
    return (
        <div className={style.score}>Score : {score}</div>
    )
}

export default ScoreCard