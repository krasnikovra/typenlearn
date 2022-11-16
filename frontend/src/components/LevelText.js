import React from 'react';
import styles from './app.module.css';

export class LevelText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textComplete: false,
      correctCharsCount: 0,
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
      }
    })
  }

  testCharacter(char) {
    if (char !== this.props.text[this.state.correctCharsCount])
      return false;
    this.state.correctCharsCount++;
    this.emCorrect.innerHTML += this.props.text[this.state.correctCharsCount - 1] !== ' ' ?
      this.props.text[this.state.correctCharsCount - 1] : '·<wbr>';
    this.em.innerHTML = this.props.text.slice(this.state.correctCharsCount);
    if (this.state.correctCharsCount === this.props.text.length) {
      this.setState(() => {
        console.log("[LevelText]: the text is complete!")
        return {
          textComplete: true,
          correctCharsCount: this.props.text.length,
        };
      });
      if (this.onComplete !== undefined)
        this.onComplete();
    }
    return true;
  }

  isTextComplete() {
    return this.state.textComplete;
  }

  render() {
    return (
      <div className={styles.levelText}>
        <div className={styles.correct}
          ref={e => this.emCorrect = e}>
        </div>
        <div className={styles.default} 
          ref={e => this.em = e}>
          {this.props.text}
        </div>
      </div>
    );
  }
}
