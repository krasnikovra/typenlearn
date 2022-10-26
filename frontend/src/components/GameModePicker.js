import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import GameModeCard from "./GameModeCard";
import Game from "./Game";

export default function GameModePicker(props) {
  return (
    <Routes>
      <Route exact path={"/"} element={
        <div className={styles.center}>
          <GameModeCard to={"text"}
            title={"Text"}
            desc={"A simple text mode which allows you to\
                  keep your typing speed good or even increase it.\
                  You will see a text which you should type as fast\
                  as you can after clicking 'Start!' button."} />
          <GameModeCard to={"text"}
            title={"Game mode"}
            desc={"Some game mode"} />
          <GameModeCard to={"text"}
            title={"Game mode"}
            desc={"Some game mode"} />
        </div>
      } />
      <Route path={"/*"} element={<Game />} />
    </Routes>
  );
}
