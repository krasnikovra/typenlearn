import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./app.module.css";
import GameModeCard from "./GameModeCard";
import Game from "./Game";
import getGameModesRequest from "./api/getGameModes";
import ButtonLink from './ButtonLink';

export default function GameModePicker(props) {
  const [gameModes, setGameModes] = React.useState(undefined)

  React.useEffect(() => {
    (async () => {
      const { url, opt } = getGameModesRequest()
      try {
        const response = await fetch(url, opt)
        const response_json = await response.json()
        if (response.status >= 400) {
          throw new Error(response.statusText)
        }
        else {
          setGameModes(response_json.gamemodes)
        }
      } catch (error) {
        console.log(error)
      }
    })();
  }, [])

  return (
    <Routes>
      <Route exact path={"/"} element={
        <>
          <ButtonLink to='/' text="Type'n'learn" />
          <div className={styles.center}>
            {gameModes !== undefined && gameModes.map((gameMode, index) => {
              return (
                <GameModeCard title={gameMode.title}
                  desc={gameMode.desc}
                  to={gameMode.link}
                  key={index} />
              )
            })}
          </div>
          <p>
            <img className={`${styles.imgCard}`} src="https://i.pinimg.com/564x/7e/4a/7d/7e4a7d8a8acfae7e84752a53811c879c.jpg" alt="oops"></img>
          </p>
        </>
      } />
      <Route path={"/*"} element={<Game />} />
    </Routes>
  );
}
