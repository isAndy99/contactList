import React from 'react';
import PropTypes from 'prop-types';

import theme from '../theme.scss';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      phone: '',
      email: '',
      photo: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const value = event.target.value;
    const name = event.target.id;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    if(this.state.name &&
    this.state.surname &&
    this.state.phone &&
    this.state.email) {
      this.props.newContact(this.state);
      this.props.toggleView();
    } else {
      alert('Fields cannot be empty!');
    }

    event.preventDefault();
  }

  render() {
    return (
      <div className={theme.AddContact} >
        <form onSubmit={this.handleSubmit}>
          <ul className={theme.formList}>
            <li>
              <label htmlFor="name">Name</label>
              <input type="text"
                id="name"
                value={this.state.name}
                onChange={this.handleInputChange} />
            </li>
            <li>
              <label htmlFor="surname">Surname</label>
              <input type="text"
                id="surname"
                value={this.state.surname}
                onChange={this.handleInputChange} />
            </li>
            <li>
              <label htmlFor="phone">Phone</label>
              <input type="tel"
                id="phone"
                value={this.state.phone}
                onChange={this.handleInputChange} />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleInputChange} />
            </li>
            <li>
              <label htmlFor="photo">Photo URL</label>
              <input type="url"
                id="photo"
                value={this.state.photo}
                onChange={this.handleInputChange} />
            </li>
            <li>
              <input type="submit"
                value="Add contact" />
            </li>
          </ul>

        </form>
      </div>
    );
  }
}

AddContact.propTypes = {
  toggleView: PropTypes.func,
  newContact: PropTypes.func,
};

export default AddContact;