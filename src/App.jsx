import React, { useEffect, useMemo, useState } from "react";
import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import GameButton from "./components/Button/button.jsx";
import StartScreen from "./components/StartScreen/startScreen.jsx";
import GameOptionScreen from "./components/GameOptionScreen/gameOptionScreen.jsx";
import Game from "./components/Game/game.jsx";
import GameOverScreen from "./components/GameOver/gameOverScreen.jsx";
import { updateGameOver, updateStart } from "./features/game/gameSlice.js";
import GameAudio from "./components/GameAudio/gameAudio.jsx";

import useSound from 'use-sound';
import click from './assets/bg-music/click.wav';

function App() {
  const gridFromState = useSelector((state) => state.grid);
  const gameOverFromState = useSelector((state) => state.gameOver);
  const pairNumbersFromState = useSelector((state) => state.pairNumbers);
  const startFromState = useSelector((state) => state.start);
  const [grid, setGrid] = useState(gridFromState);
  const [start, setStart] = useState(startFromState);
  const [gameOver, setGameOver] = useState(gameOverFromState);
  const [play] = useSound(click);

  const dispatch = useDispatch();

  const CardsFromState = useSelector((state) => state.Cards);

  useMemo(() => {
    setGrid(gridFromState);
  }, [gridFromState]);

  useEffect(() => {
    if (!startFromState && CardsFromState.length > 0 && pairNumbersFromState?.length === 0) {
      dispatch(updateGameOver(true));
    }
  }, [pairNumbersFromState, startFromState, CardsFromState.length]);


  useMemo(() => {
    setStart(startFromState);
  }, [startFromState]);

  useMemo(() => {
    setGameOver(gameOverFromState);
  }, [gameOverFromState]);

  return (
    <div className={style.main}>
      {/* Upper Navigation & Title Banner */}
      <header className={style.header}>
        <div className={style.audioWrapper}>
          <GameAudio />
        </div>
        
        <div className={style.titleWrapper}>
          <h1 className={style.title}>MEMORY MATCH MANIA</h1>
          <span className={style.subtitle}>CYBER MATRIX EDITION</span>
        </div>
        
        <div className={style.headerSpacer}></div>
      </header>

      {/* Main Game Screen Viewport */}
      <main className={style.viewport}>
        {start ? (
          <div className={style.screenWidget}>
            <StartScreen />
            <GameButton
              textBtn="PRESS START ➔"
              clickHandler={() => {
                play();
                dispatch(updateStart(false));
              }}
            />
          </div>
        ) : !grid ? (
          <div className={style.screenWidget}>
            <GameOptionScreen />
            <GameButton
              textBtn="← BACK TO MAIN MENU"
              variant="secondary"
              clickHandler={() => {
                play();
                dispatch(updateStart(true));
              }}
            />
          </div>
        ) : !gameOver ? (
          <Game />
        ) : (
          <GameOverScreen />
        )}
      </main>
    </div>
  );
}

export default App;

