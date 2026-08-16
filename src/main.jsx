import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import MusicWrapper from "./components/MusicWrapper/musicWrapper.jsx";
import bgMusic from "./assets/bg-music/game-bg-music.mp3";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <MusicWrapper src={bgMusic}>
    
      <App />
   
    </MusicWrapper>
    </Provider>
    
  </StrictMode>
);
