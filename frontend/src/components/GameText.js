import React from 'react';
import styles from './app.module.css';

import { LevelText } from './LevelText';
import { SecretInput } from './SecretInput';
import Button from './Button'
import { Timer } from './Timer';
import { Delay } from './Delay';

import getTextsRequest from './api/getTexts';
import postRecordRequest from './api/postRecord';
import Utils from './utils';

export default class GameText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameModeId: 1,
      link: props.link,
      data: {
        texts: undefined,
        currentTextIndex: undefined,
        recordTextComponent: <></>,
      },
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

  __onPrevClick = () => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        currentTextIndex: this.state.data.currentTextIndex - 1 >= 0 ?
          this.state.data.currentTextIndex - 1 : this.state.data.texts.length - 1
      }
    })
  }

  __onNextClick = () => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        currentTextIndex: this.state.data.currentTextIndex + 1 < this.state.data.texts.length ?
          this.state.data.currentTextIndex + 1 : 0
      }
    })
  }


  __fetchTexts = async () => {
    const { url, opt } = getTextsRequest(this.state.gameModeId)
    try {
      const response = await fetch(url, opt)
      const response_json = await response.json()

      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      else if (response_json.texts.length === 0) {
        throw new Error("No texts available")
      }
      else {
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            texts: response_json.texts,
            currentTextIndex: 0
          }
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  __fetchRecord = async (timems) => {
    const { url, opt } = postRecordRequest(this.state.data.texts[this.state.data.currentTextIndex].id,
      this.state.gameModeId, timems)
    console.log(opt)
    try {
      const response = await fetch(url, opt)
      const response_json = await response.json()

      if (response.status >= 400) {
        throw new Error(response.statusText)
      }
      else {
        const recordTextComponent = !response_json.authorized ?
          <>This could be your record, but you are unauthorized :(
            <br />Try <a href={`../login/?next=${`/game/${this.state.link}`}`}>logging in</a> to track your records!</> :
          response_json.record.timems < timems ?
            <>{`Nice try! Your record is: ${Utils.timeFormat(response_json.record.timems)}`}</> :
            <>Congratulations! This is your new record for this text!</>
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            recordTextComponent: recordTextComponent,
          },
          buttonHidden: false,
          placeholder: "Game over!",
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  componentDidMount() {
    (async () => {
      console.log('[Game]: fetching text from api...');
      await this.__fetchTexts()
      console.log("[Game]: Text fethced successfully.");

      this.delay !== null && this.delay.setAction(ev => {
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

      this.levelText !== null && this.levelText.setOnComplete(() =>
        (async ev => {
          const timeMs = this.timer.stop();
          this.levelText.refresh();
          this.secretInput.unbindLevelText();
          await this.__fetchRecord(timeMs)
          console.log(`[Game]: Game over! Your time is: ${Utils.timeFormat(timeMs)}`);
        })()
      );
    })();
  }

  render() {
    return (
      <div className={`${styles.center} ${styles.column}`}>
        <SecretInput ref={e => this.secretInput = e} />
        <LevelText text={this.state.data.texts !== undefined ? this.state.data.texts[this.state.data.currentTextIndex].text : ""}
          ref={e => this.levelText = e} />
        <Timer text="Your time: "
          ref={e => this.timer = e} />
        <div hidden={this.state.buttonHidden}
          className={styles.record}>
          {this.state.data.recordTextComponent}
        </div>
        <Delay seconds={3}
          text="Game is starting in "
          ref={e => this.delay = e} />
        <div>
          <Button text="<< Previous"
            onClick={this.__onPrevClick}
            hidden={this.state.buttonHidden} />
          <Button text="Start!"
            onClick={this.__onButtonClick}
            hidden={this.state.buttonHidden} />
          <Button text="Next >>"
            onClick={this.__onNextClick}
            hidden={this.state.buttonHidden} />
        </div>
      </div>
    );
  }
}
