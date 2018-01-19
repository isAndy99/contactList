import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme.scss';

function Controls(props) {

  return (
    <div className={theme.Controls}>
      <button className={theme.Button} onClick={props.handleAddContact}>New Contact</button>
      <button className={theme.Button} onClick={props.handleSave}>Save Contacts</button>
    </div>
  );
}

Controls.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleAddContact: PropTypes.func.isRequired,
};

export default Controls;