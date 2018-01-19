import React from 'react';
// import PropTypes from 'prop-types';

import theme from '../theme.scss';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {

  }

  render() {
    return (
      <div className={theme.AddContact} >
        <form>
          <label>
            Name:
            <input
              type="text"
              name="name" />
          </label>
          <label>
            Surname:
            <input
              type="text"
              name="surname" />
          </label>
          <label>
            Phone:
            <input
              type="tel"
              name="phone" />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email" />
          </label>
          <label>
            Photo URL:
            <input
              type="url"
              name="photourl" />
          </label>
          <input type="submit"
            value="Add contact" />
        </form>
      </div>
    );
  }
}

export default AddContact;