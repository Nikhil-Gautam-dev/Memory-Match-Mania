import React, { useEffect } from "react";
import style from "./card.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { hide, selectCards } from "../../features/game/gameSlice.js";

function Card({ number, height, width, id }) {
  const [flipTheCard, setFlipTheCard] = useState("");
  const card = useSelector(state => {
    const card = state.Cards.find((card => card.id === id))

    return card
  })

  const dispatch = useDispatch()

  useEffect(() => {
    setFlipTheCard(prev => {
      if (card.hide) {
        prev = style.flip;

        return prev
      }
      else {
        return ""
      }
    })
  }, [card?.hide])



  return (
    <>
      <div
        className={`${style["main-card-container"]}`}
        style={{ height, width }}
      >
        <div className={`${style.card} ${flipTheCard}`}>
          <div className={style["the-front"]}>{number}</div>
          <div className={style["the-back"]}>😊</div>
        </div>
      </div>
    </>
  );
}

export default Card;
