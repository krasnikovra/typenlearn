import React from "react";
import { Route, Routes }
  from "react-router-dom";
import GameText from "./GameText";

export default function Game(props) {
  return (
    <Routes>
      <Route path={"text"}
        element={<GameText link="text" />} />
    </Routes>
  );
}
