import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import styles from '../scss/Label.scss';

class Label extends Component {

  render() {
    const props = this.props;
    const classes = classnames(styles.label, {
      [styles.success]: !!props.success,
      [styles.warning]: !!props.warning,
      [styles.severe]: !!props.severe,
      [styles.critical]: !!props.critical
    });

    return (
      <span className={ classes }>
        { props.children }
      </span>
    );
  }

}

Label.propTypes = {
  success: PropTypes.bool,
  warning: PropTypes.bool,
  severe: PropTypes.bool,
  critical: PropTypes.bool,
  children: PropTypes.node
};

Label.defaultProps = {
  success: false,
  warning: false,
  severe: false,
  critical: false
};

export default Label;
