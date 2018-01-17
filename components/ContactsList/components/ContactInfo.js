import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme.scss';

function ContactInfo(props) {
  return (
    <div className={theme.ContactInfo}>
      <h1 className={theme.ContactName}>{props.contact.name + ' ' + props.contact.surname}</h1>
      <div className={theme.Email}>{props.contact.email}</div>
      <div className={theme.PhoneNumber}>{props.contact.phone}</div>
    </div>
  );
}

ContactInfo.propTypes = {
  contact: PropTypes.object,
};

export default ContactInfo;