import React from 'react';
import { MainHeader } from './MainHeader';
import { ButtonLink } from './ButtonLink';
import styles from './app.module.css';

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`${styles.center} ${styles.column}`}>
        <MainHeader text="Type'n'Learn" />
        <ButtonLink to='/game' text='Play game' />
      </div>
    );
  }
}
