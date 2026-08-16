import React, { useEffect, useState } from "react";
import style from "./card.module.css";
import { useSelector } from "react-redux";
import { getCardAvatar } from "../../utils/cardRandomPositionGenerator.js";

function Card({ number, id }) {
  const [isFlipped, setIsFlipped] = useState(false);
  
  const card = useSelector(state => {
    return state.Cards.find((c) => c.id === id);
  });

  useEffect(() => {
    if (card) {
      setIsFlipped(card.hide);
    }
  }, [card?.hide]);

  const avatar = getCardAvatar(number);
  const isMatched = card?.selected && !card?.hide;
  const isWildcard = number === -1;

  return (
    <div className={style.cardContainer}>
      <div className={`${style.cardInner} ${isFlipped ? style.flipped : ""} ${isMatched ? style.matched : ""}`}>
        {/* Front Face (Revealed Card) */}
        <div className={style.cardFront}>
          <span className={style.avatarEmoji}>{avatar}</span>
          <span className={`${style.numberBadge} ${isWildcard ? style.bonusBadge : ""}`}>
            {isWildcard ? "★ BONUS" : `#${number}`}
          </span>
          <div className={style.cardGlowOverlay}></div>
        </div>


        {/* Back Face (Covered Card) */}
        <div className={style.cardBack}>
          <div className={style.cyberPattern}>
            <span className={style.backEmblem}>✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

