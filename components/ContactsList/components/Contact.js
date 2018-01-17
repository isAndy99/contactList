import React from 'react';
import PropTypes from 'prop-types';

import Photo from './Photo';
import ContactInfo from './ContactInfo';

import theme from '../theme.scss';

function Contact(props) {
  return (
    <div className={theme.Contact}>
      <Photo contact={props.contact} />
      <ContactInfo contact={props.contact} />
    </div>
  );
}

Contact.propTypes = {
  contact: PropTypes.object,
};

export default Contact;