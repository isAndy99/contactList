import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme.scss';

function Photo({ contact }) {
  return (
    <img
      className={theme.Photo}
      src={contact.photo}
      alt={contact.name + ' ' + contact.surname}
    />
  );
}

Photo.propTypes = {
  contact: PropTypes.object,
};

export default Photo;