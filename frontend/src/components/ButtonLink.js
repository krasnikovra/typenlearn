import React from 'react';
import { Link } from 'react-router-dom';
import styles from './app.module.css';

export class ButtonLink extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Link to={this.props.to} className={styles.btn}>{this.props.text}</Link>
    );
  }
}
