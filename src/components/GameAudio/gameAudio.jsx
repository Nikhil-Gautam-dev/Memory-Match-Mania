import React, { useState } from "react";
import "./gameAudio.css";
import { updateAudio } from "../../features/game/gameSlice.js";
import { useDispatch, useSelector } from "react-redux";

function GameAudio() {
  const audioFromState = useSelector((state) => state.audio);
  const dispatch = useDispatch();

  const toggleAudio = () => {
    dispatch(updateAudio(!audioFromState));
  };

  return (
    <button 
      className={`audioToggleBtn ${audioFromState ? "audioOn" : "audioOff"}`} 
      onClick={toggleAudio}
      title={audioFromState ? "Mute Audio" : "Play Sound FX"}
    >
      <span className="audioIcon">{audioFromState ? "🔊" : "🔇"}</span>
      <span className="audioText">{audioFromState ? "SOUND ON" : "MUTED"}</span>
      <span className="audioDot"></span>
    </button>
  );
}

export default GameAudio;