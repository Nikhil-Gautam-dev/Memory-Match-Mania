import { createSlice, nanoid } from "@reduxjs/toolkit";
import { randomCardPostionGenerator } from "../../utils/cardRandomPositionGenerator.js";

const initialState = {
  Cards: [],
  selectedCards: {},
  score: 100,
  flip: false,
  matchOver: false,
  grid: null,
  gameOver: false,
  pairNumbers: [0],
  start: true,
  timeOutID:null,
  audio:false
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

    updateTimeId: (state,action) =>{
      state.timeOutID = action.payload

    },

    updateAudio:(state,action)=>{
      state.audio = action.payload
    },

    reStart: (state, action) => {
      // console.log(action.payload.start)
      state.Cards = [];
      state.selectedCards = {};
      state.score = action.payload?.score ? action.payload.score : 100;
      state.flip = false;
      state.matchOver = false;
      state.grid = action.payload?.grid ? action.payload.grid : null;
      state.gameOver = false;
      state.pairNumbers = [0];
      // state.start = !action.payload?.start ? false : true;
      console.log("restart")
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


