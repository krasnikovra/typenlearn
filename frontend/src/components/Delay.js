import React from "react";
import styles from "./app.module.css";

export class Delay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      action: props.action,
      secondsLeft: props.seconds,
    };
  }

  setAction(action) {
    this.state.action = action;
  }

  run() {
    this.div.classList.remove(styles.displayNone);
    this.div.innerHTML = this.props.text + this.state.secondsLeft;
    const interval = setInterval(() => {
      this.state.secondsLeft--;
      if (this.state.secondsLeft < 1) {
        this.state.secondsLeft = this.props.seconds;
        this.div.classList.add(styles.displayNone);
        this.div.innerHTML = "";
        this.state.action();
        clearInterval(interval);
      }
      this.div.innerHTML = this.props.text + this.state.secondsLeft;
    }, 1000);
  }

  componentDidMount() {
    this.div.classList.add(styles.displayNone);
  }

  render() {
    return ( 
      <div className={styles.delay} ref={e => this.div = e}></div>
    );
  }
}
