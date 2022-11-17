import React from 'react';
import MainHeader from './MainHeader';
import ButtonLink from './ButtonLink';
import styles from './app.module.css';

export default function HomePage(props) {
  return (
    <div className={`${styles.center} ${styles.column}`}>
      <MainHeader text="Type'n'Learn" />
      <ButtonLink to='game' text='Play game' />

        <p>
            <img className={`${styles.imgHome}`} src="https://i.pinimg.com/originals/77/c7/29/77c729fe5d8ea9e1e1e460ef5b515fac.jpg" alt="oops"></img>
        </p>
    </div>
  );
}
