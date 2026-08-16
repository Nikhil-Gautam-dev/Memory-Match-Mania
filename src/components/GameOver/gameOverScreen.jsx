import React from "react";
import style from "./gameOverScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import ScoreCard from "../Score/score.jsx";
import GameButton from "../Button/button.jsx";
import { initiateGame, reStart, updateGameOver, updateStart } from "../../features/game/gameSlice.js";

function GameOverScreen() {
  const score = useSelector((state) => state.score);
  const grid = useSelector((state) => state.grid);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <ScoreCard score={score} />
        <GameButton
          textBtn="Home"
          clickHandler={() => {
            dispatch(reStart());
            dispatch(updateStart(true));
            dispatch(updateGameOver(false))
          }}
        />
        <GameButton 
        textBtn="Continue" 
        clickHandler={()=>{
          console.log("continue")
          dispatch(updateGameOver(false)); 
          dispatch(updateStart(false));
          dispatch(reStart({score:score,start:false,grid:grid}));
          dispatch(initiateGame());
        }}
        />
      </div>
    </>
  );
}

export default GameOverScreen;
