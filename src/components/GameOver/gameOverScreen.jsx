import React from "react";
import style from "./gameOverScreen.module.css";
import { useDispatch, useSelector } from "react-redux";
import GameButton from "../Button/button.jsx";
import Confetti from "../Confetti/confetti.jsx";
import { initiateGame, reStart, updateGameOver, updateStart } from "../../features/game/gameSlice.js";

function GameOverScreen() {
  const score = useSelector((state) => state.score);
  const highScore = useSelector((state) => state.highScore);
  const grid = useSelector((state) => state.grid);
  const dispatch = useDispatch();

  const isNewRecord = score >= highScore && score > 100;

  const getStarRating = (s) => {
    if (s >= 160) return "⭐⭐⭐";
    if (s >= 120) return "⭐⭐";
    return "⭐";
  };

  return (
    <>
      <Confetti />
      <div className={style.victoryModal}>
        <div className={style.trophyIcon}>🏆</div>
        <div className={style.stars}>{getStarRating(score)}</div>
        <h2 className={style.victoryTitle}>VICTORY UNLOCKED!</h2>
        {isNewRecord ? (
          <div className={style.newRecordBadge}>👑 NEW HIGH SCORE RECORD!</div>
        ) : (
          <p className={style.victorySubtitle}>You matched all memory pairs!</p>
        )}

        <div className={style.scoreGrid}>
          <div className={style.scoreBox}>
            <span className={style.scoreLabel}>FINAL SCORE</span>
            <span className={style.scoreNumber}>{score}</span>
          </div>

          <div className={`${style.scoreBox} ${style.bestScoreBox}`}>
            <span className={style.scoreLabel}>ALL-TIME BEST</span>
            <span className={style.scoreNumber}>{highScore}</span>
          </div>
        </div>

        <div className={style.actions}>
          <GameButton
            textBtn="HOME"
            variant="secondary"
            clickHandler={() => {
              dispatch(reStart());
              dispatch(updateStart(true));
              dispatch(updateGameOver(false));
            }}
          />
          <GameButton 
            textBtn="PLAY AGAIN" 
            clickHandler={() => {
              dispatch(updateGameOver(false)); 
              dispatch(updateStart(false));
              dispatch(reStart({ score: score, start: false, grid: grid }));
              dispatch(initiateGame());
            }}
          />
        </div>
      </div>
    </>
  );
}

export default GameOverScreen;


