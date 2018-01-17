import React, { Component } from 'react';

import styles from './Footer.scss';

class Footer extends Component {
  render() {
    return (
      <div className={styles.footer}>
        &copy; 2017 Cisco Systems. All rights reserved.
        <br />
        Version 0.4.0
      </div>
    );
  }
}

export default Footer;
