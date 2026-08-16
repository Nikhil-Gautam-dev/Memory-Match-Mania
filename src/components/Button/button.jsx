import React from "react"; 
import style from './button.module.css'

function GameButton({textBtn,clickHandler}){
    return (
        <button className={`${style.btn}`} onClick={(e)=>clickHandler(e)}>{textBtn}</button>
    )
}

export default GameButton; 

