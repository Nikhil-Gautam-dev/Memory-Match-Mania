import React from "react";
import style from "./score.module.css";

function ScoreCard({ score }) {
  return (
    <div className={style.scoreBadge}>
      <span className={style.scoreIcon}>🏆</span>
      <div className={style.scoreContent}>
        <span className={style.scoreLabel}>SCORE</span>
        <span className={style.scoreValue}>{score}</span>
      </div>
    </div>
  );
}

export default ScoreCard;