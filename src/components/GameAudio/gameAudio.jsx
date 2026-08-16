import React, { useState } from "react";
import "./gameAudio.css"
import { updateAudio } from "../../features/game/gameSlice.js";
import { useDispatch } from "react-redux";



function GameAudio(){
    const [slider,setSlider] = useState("");
    const [onOff,setOnOff] = useState("")

    const dispatch=useDispatch()

    const clickHandler=(e)=>{
        if(onOff==="" || onOff==="off"){
            console.log(e.target)
            setOnOff("on")
            setSlider("slider-animation-left-right")
            dispatch(updateAudio(true))
        }
        else{
            setOnOff("off")
            setSlider("slider-animation-right-left")
            dispatch(updateAudio(false))
        }
    }
    return (
        <>
        
        <div className={`main ${onOff}`} onClick={(e)=>clickHandler(e)} state="off">
            <div className={`slider ${slider}`}></div>
        </div>
        
        </>
    )
}

export default GameAudio;