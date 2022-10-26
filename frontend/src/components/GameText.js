import React from 'react';
import styles from './app.module.css';

import { LevelText } from './LevelText';
import { SecretInput } from './SecretInput';
import Button from './Button'
import { timeFormat, Timer } from './Timer';
import { Delay } from './Delay';

export default class GameText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      loaded: false,
      buttonHidden: false,
      placeholder: "Loading...",
    }
  }

  __onButtonClick = () => {
    this.delay.run();
    this.setState(() => {
      console.log("[Game]: Game is starting soon!");
      return {
        ...this.state,
        buttonHidden: true,
        placeholder: "Game is starting soon!",
      }
    });
  }

  componentDidMount() {
    console.log('[Game]: fetching text from api...');
    const text = "Lorem ipsum dolor.";
    console.log(text);
    console.log("[Game]: Text fethced successfully.");
    this.setState(() => {
      console.log("[Game]: Loading complete.");
      return {
        ...this.state,
        data: {
          text: text,
        },
        loaded: true,
        placeholder: "Loading complete."
      };
    });

    this.delay.setAction(ev => {
      this.secretInput.bindLevelText(this.levelText);
      this.timer.start();
      this.setState(() => {
        console.log("[Game]: Game started!");
        return {
          ...this.state,
          placeholder: "Game started!",
        }
      });
    })

    this.levelText.setOnComplete(ev => {
      const timeMs = this.timer.stop();
      this.levelText.refresh();
      this.secretInput.unbindLevelText();
      // TODO: push timeMs to the database and check if
      // it is a new record
      this.setState(() => {
        console.log(`[Game]: Game over! Your time is: ${timeFormat(timeMs)}`);
        return {
          ...this.state,
          buttonHidden: false,
          placeholder: "Game over!",
        }
      });
    });
  }

  render() {
    return (
      <div className={`${styles.center} ${styles.column}`}>
        <SecretInput ref={e => this.secretInput = e} />
        <LevelText text={this.state.data.text}
          ref={e => this.levelText = e} />
        <Timer text="Your time: "
          ref={e => this.timer = e} />
        <Delay seconds={3}
          text="Game is starting in "
          ref={e => this.delay = e} />
        <Button text="Start!"
          onClick={this.__onButtonClick}
          hidden={this.state.buttonHidden} />
      </div>
    );
  }
}
