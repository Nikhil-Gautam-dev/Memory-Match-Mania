import React from "react";
import style from './timer.module.css';

function TimerCard({ timer }) {
  const isPreview = timer > 0;
  return (
    <div className={`${style.timerBadge} ${isPreview ? style.previewing : style.active}`}>
      <span className={style.timerIcon}>{isPreview ? "👁️" : "⚔️"}</span>
      <div className={style.timerContent}>
        <span className={style.timerLabel}>
          {isPreview ? "MEMORIZE" : "GAME ON"}
        </span>
        <span className={style.timerValue}>
          {isPreview ? `${timer}s` : "GO!"}
        </span>
      </div>
    </div>
  );
}

export default TimerCard;