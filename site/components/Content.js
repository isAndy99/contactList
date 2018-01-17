import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Content.scss';

class Content extends Component {
  render() {
    return (
      <div className={styles.content}>
        {this.props.children || this.renderEmptyPage()}
      </div>
    );
  }

  renderEmptyPage() {
    return <div>no page selected</div>;
  }
}

Content.propTypes = {
  children: PropTypes.node
};

export default Content;
