import React from "react";
import { Route, Routes }
  from "react-router-dom";
import GameText from "./GameText";
import GameWordByWord from "./GameWordByWord";

export default function Game(props) {
  return (
    <Routes>
      <Route path={"text"}
        element={<GameText link="text" />} />
      <Route path={"word-by-word"}
        element={<GameWordByWord link="word-by-word" />} />
    </Routes>
  );
}
