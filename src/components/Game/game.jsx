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
  const [grid, setGrid] = useState(gridFromState);
  const dispatch = useDispatch();
  const CardsFromState = useSelector((state) => state.Cards);
  const [Cards, setCards] = useState(CardsFromState);
  const [timer, setTimer] = useState(3);
  const [play] = useSound(flip);

  useMemo(() => {
    setCards(CardsFromState);
    const intervalId = setInterval(() => {
      setTimer(prevTimer => prevTimer-1);
      console.log(timer)
    }, 1000);

    setTimeout(() => {
      clearInterval(intervalId);
      dispatch(hide());
      console.log("play")
      
    }, 3000);
  }, [CardsFromState.length]);

  

  // dispatch(initiateGame())

  const cardSelectionHandler = (Card) => {
    play()
    if (!Card.selected && timer === 0) {
      if (!Object.keys(selectedCardFromState).length) {
        // first selection

        const newSelectedCardState = {};
        newSelectedCardState[Card.number] = [Card.id];

        dispatch(selectCards(newSelectedCardState));
        dispatch(hide(Card.id));
    
      }
      //
      else if (selectedCardFromState[Card.number]) {
        dispatch(hide(Card.id));
        

        const newSelectedCardState = {};

        for (let keys in selectedCardFromState) {
          newSelectedCardState[keys] = selectedCardFromState[keys];
        }

        newSelectedCardState[Card.number] = [
          Card.id,
          selectedCardFromState[Card.number][0],
        ];
        dispatch(selectCards(newSelectedCardState));

        let updatedPairNumbers = [...pairNumbersFromState];
        let index = updatedPairNumbers.indexOf(Card.number);
        updatedPairNumbers.splice(index, 1);

        dispatch(updateScore(20));

        setTimeout(() => {
          dispatch(selectCards({}));
          dispatch(updatePairNumbers(updatedPairNumbers));
        }, 800);
      }
      //
      else {
        dispatch(hide(Card.id));

        const newSelectedCardState = {};

        for (let keys in selectedCardFromState) {
          newSelectedCardState[keys] = selectedCardFromState[keys];
        }

        newSelectedCardState[Card.number] = [Card.id];

        dispatch(selectCards(newSelectedCardState));

        dispatch(updateScore(-10));

        setTimeout(() => {
          dispatch(deselectCards());
        }, 800);
      }
    }
  };

  return (
    <>
      <GameButton
        textBtn="restart"
        clickHandler={() => {
          dispatch(gridSelector(0));
          dispatch(reStart())
        }}
      />

      <TimerCard timer={timer} />
      <ScoreCard score={scoreFromState} />

      <div
        className={style["grid-container"]}
        style={{
          gridTemplateColumns: `repeat(${gridFromState}, 1fr)`,
          gridTemplateRows: `repeat(${gridFromState}, 1fr)`,
        }}
      >
        {CardsFromState.length !== 0 ? (
          CardsFromState.map((card) => (
            <div
              key={card.id}
              onClick={() => {
                cardSelectionHandler(card);
              }}
            >
              <Card
                number={card.number}
                height="100px"
                width="75px"
                id={card.id}
              />
            </div>
          ))
        ) : (
          <>Loading....</>
        )}
      </div>
    </>
  );
}

export default Game;
