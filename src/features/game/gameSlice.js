import { createSlice, nanoid } from "@reduxjs/toolkit";
import { randomCardPostionGenerator } from "../../utils/cardRandomPositionGenerator.js";

const savedHighScore = parseInt(localStorage.getItem("memory_match_high_score") || "0", 10);

const initialState = {
  Cards: [],
  selectedCards: {},
  score: 100,
  highScore: savedHighScore,
  flip: false,
  matchOver: false,
  grid: null,
  gameOver: false,
  pairNumbers: [],
  start: true,
  timeOutID: null,
  audio: false
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initiateGame: (state, _) => {
      state.Cards.splice(0, state.Cards.length);
      const { randomPosArr, pairNumbers } = randomCardPostionGenerator(
        state.grid
      );

      randomPosArr.forEach((cardNumber, index) => {
        let newCard = {
          number: cardNumber,
          index,
          id: nanoid(),
          selected: false,
          hide: false,
        };
        state.Cards.push(newCard);
      });

      state.pairNumbers = pairNumbers;
    },

    hide: (state, action) => {
      if (action.payload) {
        state.Cards.forEach((card) => {
          if (card.id === action.payload) {
            card.hide = false;
            card.selected = true;
            return;
          }
        });

        return;
      }

      state.Cards.forEach((card) => {
        card.hide = true;
      });

      state.flip = !state.flip;
    },

    selectCards: (state, action) => {
      state.selectedCards = action.payload;
    },

    deselectCards: (state, _) => {
      const newSelectedCardState = {};

      for (let keys in state.selectedCards) {
        if (state.selectedCards[keys].length > 1) {
          newSelectedCardState[keys] = state.selectedCards[keys];
        } else {
          state.Cards.forEach((card) => {
            if (card.id === state.selectedCards[keys][0]) {
              card.hide = true;
              card.selected = false;
            }
          });
        }
      }

      state.selectedCards = newSelectedCardState;
    },

    gridSelector: (state, action) => {
      state.grid = action.payload;
    },

    updateScore: (state, action) => {
      state.score = state.score + action.payload;
      if (state.score > state.highScore) {
        state.highScore = state.score;
        try {
          localStorage.setItem("memory_match_high_score", state.score.toString());
        } catch (e) {
          console.error("Failed to save high score:", e);
        }
      }
    },
    updateStart: (state, action) => {
      state.start = action.payload;
    },

    updatePairNumbers: (state, action) => {
      state.pairNumbers = action.payload;
    },
    updateGameOver: (state, action) => {
      state.gameOver = action.payload;
    },

    updateTimeId: (state, action) => {
      state.timeOutID = action.payload;
    },

    updateAudio: (state, action) => {
      state.audio = action.payload;
    },

    reStart: (state, action) => {
      state.Cards = [];
      state.selectedCards = {};
      const newScore = action.payload?.score ? action.payload.score : 100;
      state.score = newScore;
      if (newScore > state.highScore) {
        state.highScore = newScore;
        try {
          localStorage.setItem("memory_match_high_score", newScore.toString());
        } catch (e) {
          console.error("Failed to save high score:", e);
        }
      }
      state.flip = false;
      state.matchOver = false;
      state.grid = action.payload?.grid ? action.payload.grid : null;
      state.gameOver = false;
      state.pairNumbers = [];
    },
  },
});



export const {
  initiateGame,
  hide,
  selectCards,
  gridSelector,
  deselectCards,
  updateScore,
  updatePairNumbers,
  updateStart,
  reStart,
  updateGameOver,
  updateTimeId,
  updateAudio
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;


