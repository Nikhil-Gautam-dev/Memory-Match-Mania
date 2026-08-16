import React from "react";
import style from "./gameOptionScreen.module.css";
import { useDispatch } from "react-redux";
import { gridSelector, initiateGame } from "../../features/game/gameSlice.js";

function GameOptionScreen() {
  const dispatch = useDispatch();

  const gameOptionClickHandler = (gridSize) => {
    dispatch(gridSelector(gridSize));
    dispatch(initiateGame());
  };

  return (
    <div className={style.container}>
      <h2 className={style.title}>SELECT GRID MODE</h2>
      <p className={style.subtitle}>Choose your challenge level to begin</p>

      <div className={style.optionsGrid}>
        <div 
          className={style.optionCard} 
          onClick={() => gameOptionClickHandler(3)}
        >
          <div className={style.gridIcon}>3×3</div>
          <div className={style.modeInfo}>
            <span className={style.modeTitle}>ROOKIE MODE</span>
            <span className={style.modeBadge}>9 Cards • 4 Pairs</span>
          </div>
          <button className={style.selectBtn}>PLAY 3×3</button>
        </div>

        <div 
          className={style.optionCard} 
          onClick={() => gameOptionClickHandler(4)}
        >
          <div className={`${style.gridIcon} ${style.proIcon}`}>4×4</div>
          <div className={style.modeInfo}>
            <span className={style.modeTitle}>PRO MODE</span>
            <span className={style.modeBadge}>16 Cards • 7 Pairs</span>
          </div>
          <button className={`${style.selectBtn} ${style.proBtn}`}>PLAY 4×4</button>
        </div>
      </div>
    </div>
  );
}

export default GameOptionScreen;

