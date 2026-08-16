import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./App/store.js";
import { StrictMode } from "react";
import MusicWrapper from "./components/MusicWrapper/musicWrapper.jsx";


ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
    <MusicWrapper src="src\assets\bg-music\game-bg-music.mp3">
    
      <App />
   
    </MusicWrapper>
    </Provider>
    
  </StrictMode>
);
