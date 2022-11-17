import React from 'react';
import styles from './app.module.css';

export default function MainHeader(props) {
  return (
    <div className={styles.mainText}>{props.text}</div>
  );
}
