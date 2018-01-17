import React from 'react';
import PropTypes from 'prop-types';

import theme from './theme.scss';
// theme css module object
// treats .ContactList as theme.ContactList as a string,
// you can pass this in as the className for your component.
// same for other .class definitions inside theme.scss

class ContactList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      persons: [
        {
          name: 'Loading...',
          surname: '',
          phone: '',
          email: '',
          photo: 'https://t3.ftcdn.net/jpg/01/87/38/18/240_F_187381803_PkyqnKdHacpV4dXk6jaHGTvtdwqVCclS.jpg'
        }
      ]
    };
  }

  getPersons() {
    fetch('https://uinames.com/api/?amount=10&ext', {
      method: 'get'
    })
      .then(response => response.json())
      .then(jsonData =>
        this.setState({
          persons: jsonData
        })
      )
      .catch(err => {
        alert(err);
      });
  }

  componentDidMount() {
    this.getPersons();
  }

  render() {
    return (
      <div className={theme.ContactList}>
        <ul>
          {this.state.persons.map((person, index) => (
            <li key={index}>
              <Contact contact={person}  />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ContactList.propTypes = { // this is for later, we'll use the theme import for now.
  theme: PropTypes.object
};

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

export default ContactList;
