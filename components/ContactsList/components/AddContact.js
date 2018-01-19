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
          <ul className={theme.formList}>
            <li>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" />
            </li>
            <li>
              <label htmlFor="last-name">Surname</label>
              <input type="text" id="surname" />
            </li>
            <li>
              <label htmlFor="phone">Phone</label>
              <input type="tel" id="phone" />
            </li>
            <li>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" />
            </li>
            <li>
              <label htmlFor="photo">Photo URL</label>
              <input type="url" id="photo" />
            </li>
            <li>
              <input type="submit"
                value="Add contact"
                id={theme.addContactBtn} />
            </li>
          </ul>

        </form>
      </div>
    );
  }
}

export default AddContact;