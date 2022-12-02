import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./app.module.css";
//import ButtonLink from './ButtonLink';

export default function GameModeCard(props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(props.to);
  }

  return (
    <div className={styles.gameModeCard} onClick={onClick}>
      <div className={styles.cardHeader}>{props.title}</div>
      <div className={styles.cardDesc}>{props.desc}</div>

        <p>
        <img className={`${styles.imgCard}`} src="https://i.pinimg.com/564x/7e/4a/7d/7e4a7d8a8acfae7e84752a53811c879c.jpg" alt="oops"></img>
        </p>
    </div>
  );
}
