import React from 'react';
import styles from './app.module.css'

export default function Button(props) {
  return (
    <button type="button"
      onClick={props.onClick}
      className={`${styles.btn}${props.hidden ? " " + styles.hidden : ""}`}>
      {props.text}
    </button>
  );
}
