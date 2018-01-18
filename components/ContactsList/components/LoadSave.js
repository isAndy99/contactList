import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme.scss';

function LoadSave(props) {

  return (
    <div className={theme.LoadSave}>
      <button className={theme.Button} onClick={props.handleSave}>Save Contacts</button>
      <button className={theme.Button} onClick={props.handleLoad}>Load Contacts</button>
    </div>
  );
}

LoadSave.propTypes = {
  handleSave: PropTypes.func,
  handleLoad: PropTypes.func,
};

export default LoadSave;