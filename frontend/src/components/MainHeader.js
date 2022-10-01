import React from 'react';
import styles from './app.module.css';

export class MainHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.header}>{this.props.text}</div>
    );
  }
}
