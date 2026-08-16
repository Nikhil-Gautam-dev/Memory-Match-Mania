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

  const dispatch = useDispatch()

  useMemo(() => {
    setGrid(gridFromState);
  }, [gridFromState]);

  useEffect(() => {
    if(pairNumbersFromState?.length === 0){
      dispatch(updateGameOver(true))
    }
    
  }, [pairNumbersFromState]);

  useMemo(()=>{
    setStart(startFromState)
  },[startFromState])

  useMemo(()=>{
    setGameOver(gameOverFromState)
  },[gameOverFromState])

  return (
    <>
      <div className={style.main}>
        <section className={style["upper-section"]}>
          <GameAudio/>
          <div className={style.title}>Memory-Match-Mania</div>
        </section>
        <section className={style["lower-section"]}>
          {start ? (
            <>
              <div className={style["screen-widgets"]}>
                <StartScreen />
                <GameButton
                  textBtn="Start"
                  clickHandler={() => {
                    console.log(Date.now())
                    play()
                    // setStart(false);
                    dispatch(updateStart(false))}}
                />
              </div>
            </>
          ) : !grid ? (
            <>
              <GameButton
                textBtn="back"
                clickHandler={() => {
                  play()
                  dispatch(updateStart(true))}}
              />
              <GameOptionScreen />
            </>
          ) : 
          !gameOver ? (
            <Game />
          ) : (
           <GameOverScreen/>
          )
          }
        </section>
      </div>
    </>
  );
}

export default App;
