import React from 'react';
import MainHeader from './MainHeader';
import ButtonLink from './ButtonLink';
import styles from './app.module.css';

export default function HomePage(props) {
  return (
    <div className={`${styles.center} ${styles.column}`}>
      <MainHeader text="Type'n'Learn" />
      <ButtonLink to='game' text='Play game' />
    </div>
  );
}
