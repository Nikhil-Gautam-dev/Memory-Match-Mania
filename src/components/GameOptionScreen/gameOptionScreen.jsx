import React from "react";
import style from "./gameOptionScreen.module.css";
import GameButton from "../Button/button.jsx";
import { useDispatch } from "react-redux";
import { gridSelector, initiateGame,hide } from "../../features/game/gameSlice.js";

function GameOptionScreen() {
  const dispatch = useDispatch();

  const gameOptionClickHandler = (gridSize) => {
    dispatch(gridSelector(gridSize));
    dispatch(initiateGame())
  };

  return (
    <>
      <div>
        <div>Choose the Grid size you want to play with</div>
        <div>
          <GameButton
            textBtn="3 X 3"
            clickHandler={() => gameOptionClickHandler(3)}
          />
          <GameButton
            textBtn="4 X 4"
            clickHandler={() => gameOptionClickHandler(4)}
          />
        </div>
      </div>
    </>
  );
}

export default GameOptionScreen;
