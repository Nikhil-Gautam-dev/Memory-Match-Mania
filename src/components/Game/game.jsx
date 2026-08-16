import React, { useEffect, useMemo, useState } from "react";
import style from "./game.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  deselectCards,
  gridSelector,
  hide,
  initiateGame,
  reStart,
  selectCards,
  updatePairNumbers,
  updateScore,
  updateTimeId,
} from "../../features/game/gameSlice.js";
import Card from "../Card/card.jsx";
import GameButton from "../Button/button.jsx";
import TimerCard from "../Timer/timer.jsx";
import ScoreCard from "../Score/score.jsx";

import useSound from 'use-sound';
import flip from '../../assets/bg-music/flip.wav';

function Game() {
  const gridFromState = useSelector((state) => state.grid);
  const selectedCardFromState = useSelector((state) => state.selectedCards);
  const pairNumbersFromState = useSelector((state) => state.pairNumbers);
  const scoreFromState = useSelector((state) => state.score);
  const dispatch = useDispatch();
  const CardsFromState = useSelector((state) => state.Cards);
  
  const [timer, setTimer] = useState(3);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [play] = useSound(flip);

  useEffect(() => {
    setTimer(3);
    setIsEvaluating(false);

    const intervalId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(intervalId);
          dispatch(hide());
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [CardsFromState.length, dispatch]);

  const cardSelectionHandler = (CardItem) => {
    // Ignore clicks if memory preview is active, an evaluation is in progress, or card is already revealed
    if (timer > 0 || isEvaluating || CardItem.selected) return;

    play();

    // Wildcard Star Card (-1) -> Auto match with bonus score
    if (CardItem.number === -1) {
      dispatch(hide(CardItem.id));
      dispatch(updateScore(15));
      return;
    }

    if (!Object.keys(selectedCardFromState).length) {
      // First card selection
      const newSelectedCardState = {};
      newSelectedCardState[CardItem.number] = [CardItem.id];

      dispatch(selectCards(newSelectedCardState));
      dispatch(hide(CardItem.id));
    } else if (selectedCardFromState[CardItem.number]) {
      // Second card selection - MATCH!
      setIsEvaluating(true);
      dispatch(hide(CardItem.id));

      const newSelectedCardState = { ...selectedCardFromState };
      newSelectedCardState[CardItem.number] = [
        CardItem.id,
        selectedCardFromState[CardItem.number][0],
      ];
      dispatch(selectCards(newSelectedCardState));

      let updatedPairNumbers = [...pairNumbersFromState];
      let index = updatedPairNumbers.indexOf(CardItem.number);
      if (index !== -1) {
        updatedPairNumbers.splice(index, 1);
      }

      dispatch(updateScore(20));

      setTimeout(() => {
        dispatch(selectCards({}));
        dispatch(updatePairNumbers(updatedPairNumbers));
        setIsEvaluating(false);
      }, 500);
    } else {
      // Second card selection - MISMATCH!
      setIsEvaluating(true);
      dispatch(hide(CardItem.id));

      const newSelectedCardState = { ...selectedCardFromState };
      newSelectedCardState[CardItem.number] = [CardItem.id];

      dispatch(selectCards(newSelectedCardState));
      dispatch(updateScore(-10));

      setTimeout(() => {
        dispatch(deselectCards());
        setIsEvaluating(false);
      }, 800);
    }
  };

  return (
    <div className={style.gameContainer}>
      {/* Top Game HUD Bar */}
      <div className={style.hudBar}>
        <GameButton
          textBtn="↺ RESTART"
          variant="secondary"
          clickHandler={() => {
            dispatch(gridSelector(0));
            dispatch(reStart());
          }}
        />

        <div className={style.hudStats}>
          <TimerCard timer={timer} />
          <ScoreCard score={scoreFromState} />
        </div>
      </div>

      {/* Grid Container */}
      <div
        className={style.gridContainer}
        style={{
          gridTemplateColumns: `repeat(${gridFromState}, 1fr)`,
        }}
      >
        {CardsFromState.length !== 0 ? (
          CardsFromState.map((card) => (
            <div
              key={card.id}
              className={style.cardSlot}
              onClick={() => {
                cardSelectionHandler(card);
              }}
            >
              <Card
                number={card.number}
                id={card.id}
              />
            </div>
          ))
        ) : (
          <div className={style.loadingText}>Initializing Memory Matrix...</div>
        )}
      </div>
    </div>
  );
}

export default Game;


