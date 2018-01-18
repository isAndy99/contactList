import React from 'react';
// import PropTypes from 'prop-types';

import theme from '../theme.scss';

class AddContact extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={theme.AddContact} >
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Surname:
            <input type="text" name="surname" />
          </label>
          <label>
            Phone:
            <input type="text" name="phone" />
          </label>
          <label>
            Email:
            <input type="text" name="email" />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default AddContact;