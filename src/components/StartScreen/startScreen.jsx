import React from "react";
import style from './startScreen.module.css';
import { useSelector } from "react-redux";

function StartScreen() {
  const highScore = useSelector((state) => state.highScore);

  return (
    <div className={style.container}>
      <div className={style.headerBadges}>
        <span className={style.badge}>ARCADE EDITION</span>
        {highScore > 0 && (
          <span className={style.highScoreBadge}>
            👑 HIGH SCORE: {highScore}
          </span>
        )}
      </div>
      <h1 className={style.title}>WELCOME TO THE ARENA</h1>
      <p className={style.description}>
        Test your cognitive memory speed and precision! Memorize card positions before the preview timer runs out, then flip matching pairs to rack up massive scores.
      </p>
      
      <div className={style.featureGrid}>
        <div className={style.featureItem}>
          <span className={style.featureIcon}>⚡</span>
          <div>
            <h3>Speed Memory</h3>
            <p>3-second quick view</p>
          </div>
        </div>
        <div className={style.featureItem}>
          <span className={style.featureIcon}>🎯</span>
          <div>
            <h3>Precision Match</h3>
            <p>+20 pts for matching</p>
          </div>
        </div>
        <div className={style.featureItem}>
          <span className={style.featureIcon}>🔥</span>
          <div>
            <h3>Combo Streaks</h3>
            <p>Avoid score penalties</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
