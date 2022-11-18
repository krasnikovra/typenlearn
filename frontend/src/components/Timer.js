import React from "react";
import styles from './app.module.css';

import Utils from "./utils";

export class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startedTimestamp: undefined,
      intervalId: undefined,
      extraMs: 0,
    };
  }

  componentDidMount() {
    this.em.textContent = "00:00.000";
  }

  start() {
    console.log('[Timer]: timer started');
    this.state.startedTimestamp = new Date();
    const start = this.state.startedTimestamp;
    this.state.intervalId = setInterval(() => {
      const now = new Date();
      this.em.textContent = Utils.timeFormat(now - start + this.state.extraMs);
    });
  }

  stop() {
    clearInterval(this.state.intervalId);
    const res = new Date() - this.state.startedTimestamp + this.state.extraMs;
    console.log('[Timer]: timer stopped');
    this.state.startedTimestamp = undefined;
    this.state.intervalId = undefined;
    this.state.extraMs = 0;
    return res;
  }

  increment(extraMs) {
    this.state.extraMs += extraMs;
    this.em.classList.add(styles.errorTimer);
    setTimeout(() => this.em.classList.remove(styles.errorTimer), 250)
  }

  render() {
    return (
      <div className={styles.timer}>
        {this.props.text}<em ref={e => this.em = e}></em>
      </div>
    );
  }
}
