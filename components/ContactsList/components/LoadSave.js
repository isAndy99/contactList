import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme.scss';

function LoadSave(props) {

  return (
    <div className={theme.LoadSave}>
      <button className={theme.Button} onClick={props.handleAddContact}>Add Contact</button>
      <button className={theme.Button} onClick={props.handleSave}>Save Contacts</button>
    </div>
  );
}

LoadSave.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
};

export default LoadSave;