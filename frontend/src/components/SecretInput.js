// An input used to catch char-based keyboard events

import React from "react";
import styles from "./app.module.css"

export class SecretInput extends React.Component {
  constructor(props) {
    super(props);
  }

  __setUpInput() {
    this.secretInput.onfocus = ev => { };
    this.secretInput.onblur = ev => ev.target.focus();
    this.secretInput.oninput = ev => {
      console.log(`[SecretInput]: pressed ${ev.target.value[0]}`);
      const isCorrect = this.levelText.testCharacter(ev.target.value[0]);
      console.log(`[SecretInput]: input is ${isCorrect ? "correct" : "bad"}`);
      ev.target.value = "";
    }
    this.secretInput.focus();
  }

  __detachInput() {
    this.secretInput.onblur = ev => { };
    this.secretInput.onfocus = ev => ev.target.blur();
    this.secretInput.oninput = ev => { };
    this.secretInput.blur();
  }

  // Don't forget to bind levelText if it is mounting first!
  bindLevelText(levelText) {
    this.levelText = levelText;
    this.__setUpInput();
  }

  unbindLevelText() {
    this.__detachInput();
    this.levelText = undefined;
  }

  componentDidMount() {
    if (this.props.levelText === undefined)
      return;
    this.__setUpInput();
  }

  render() {
    return (
      <input type="text"
        className={styles.hiddenInput}
        ref={e => this.secretInput = e}>
      </input>
    );
  }
}
