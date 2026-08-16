import React from "react"; 
import style from './button.module.css';

function GameButton({ textBtn, clickHandler, variant = "primary" }) {
  return (
    <button 
      className={`${style.btn} ${style[variant] || ""}`} 
      onClick={(e) => clickHandler && clickHandler(e)}
    >
      <span className={style.btnText}>{textBtn}</span>
      <span className={style.shimmer}></span>
    </button>
  );
}

export default GameButton;
