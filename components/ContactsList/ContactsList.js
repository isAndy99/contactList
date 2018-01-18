import React from 'react';
import PropTypes from 'prop-types';

import Contact from './components/Contact';
import LoadSave from './components/LoadSave';

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
    this.downloadContacts = this.downloadContacts.bind(this);
  }

  fetchPersons() {
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

  downloadContacts() {
    if(this.state.persons[0].surname || this.state.persons[0].email) {
      localStorage.setItem('contacts', JSON.stringify(this.state.persons));
    } else {
      alert('Contact list is empty!');
    }
  }

  componentDidMount() {
    this.fetchPersons();
  }

  render() {
    return (
      <div className={theme.ContactList}>
        <LoadSave handleSave={this.downloadContacts} />
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

export default ContactList;