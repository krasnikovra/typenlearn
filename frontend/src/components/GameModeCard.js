import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./app.module.css";

export default function GameModeCard(props) {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(props.to);
  }

  return (
    <div className={styles.gameModeCard} onClick={onClick}>
      <div className={styles.cardHeader}>{props.title}</div>
      <div className={styles.cardDesc}>{props.desc}</div>
      <img src={props.img} />
    </div>
  );
}
