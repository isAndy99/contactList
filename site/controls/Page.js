import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Page.scss';

export default class Page extends Component {
  render() {
    const { name, children } = this.props;

    return (
      <article>
        <header className={styles.heading}>
          <h1>{name}</h1>
        </header>
        <div className={styles.content}>{children}</div>
      </article>
    );
  }
}

Page.propTypes = {
  name: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.array]).isRequired
};
