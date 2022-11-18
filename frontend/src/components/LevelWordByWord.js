import React from 'react';
import styles from './app.module.css';

export default class LevelWordByWord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textComplete: false,
      correctCharsCount: 0,
      correctCharsPerWordCount: 0,
      currentWordIndex: 0,
    }
  }

  setOnComplete(onComplete) {
    this.onComplete = onComplete;
  }

  refresh() {
    this.em.textContent = this.props.text;
    this.emCorrect.textContent = "";
    this.setState(() => {
      console.log("[LevelText]: LevelText is refreshed");
      return {
        textComplete: false,
        correctCharsCount: 0,
        correctCharsPerWordCount: 0,
        currentWordIndex: 0,
      }
    })
  }

  testCharacter(char) {
    if (char !== this.props.text[this.state.correctCharsCount])
      return false;
    this.state.correctCharsCount++;
    this.state.correctCharsPerWordCount++;
    this.emCorrect.innerHTML += this.props.text[this.state.correctCharsCount - 1];
    if (this.state.correctCharsCount === this.props.text.length) {
      this.setState(() => {
        console.log("[LevelText]: the text is complete!")
        return {
          ...this.state,
          textComplete: true,
          correctCharsCount: this.props.text.length,
        };
      });
      if (this.onComplete !== undefined)
        this.onComplete();
    } else {
      if (this.props.text[this.state.correctCharsCount - 1] === ' ') {
        this.emCorrect.innerHTML = "";
        this.setState(() => {
          return {
            ...this.state,
            correctCharsPerWordCount: 0,
            currentWordIndex: this.state.currentWordIndex + 1,
          }
        })
      } else {
        this.setState(() => this.state)
      }
    }
    return true;
  }

  isTextComplete() {
    return this.state.textComplete;
  }

  render() {
    return (
      <div className={styles.wordByWordContainer}>
        <div className={styles.levelTextSecondaryLeft}>
          {this.state.currentWordIndex > 0 && this.props.text.split(" ")[this.state.currentWordIndex - 1]}
        </div>
        <div className={styles.levelText}>
          <div className={styles.correct}
            ref={e => this.emCorrect = e}>
          </div>
          <div className={styles.default}
            ref={e => this.em = e}>
            {this.props.text.split(" ")[this.state.currentWordIndex].slice(this.state.correctCharsPerWordCount)}
          </div>
        </div>
        <div className={styles.levelTextSecondaryRight}>
          {this.state.currentWordIndex + 1 < this.props.text.split(" ").length && this.props.text.split(" ")[this.state.currentWordIndex + 1]}
        </div>
      </div>
    );
  }
}
