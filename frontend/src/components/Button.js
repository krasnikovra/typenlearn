import React from 'react';
import styles from './app.module.css'

export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  hide() {
    this.button.classList.add(styles.displayNone);
  }

  unhide() {
    this.button.classList.remove(styles.displayNone);
  }

  setOnClick(onclick) {
    this.button.onclick = onclick;
  }

  componentDidMount() {
    this.button.onclick = this.props.onclick;
  }

  render() {
    return (
      <button className={styles.btn}
              ref={e => this.button = e}>
        {this.props.text}
      </button>
    );
  }
}
