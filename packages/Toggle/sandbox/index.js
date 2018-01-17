import React from 'react';

import Toggle from '../src/Toggle';

export default class ToggleBox extends React.Component {

  constructor() {
    super();
    this.state = {
      value1: true,
      value2: true,
      value3: true
    };
  }

  onChange(index, isSet) {
    this.setState({ ['value' + index]: isSet });
  }

  render() {
    const state = this.state;
    return (
      <div>

        <h2>Standard</h2>
        <Toggle
          value={ state.value1 }
          onChange={ this.onChange.bind(this, 1) }/>
        &nbsp;
        <Toggle/>

        <hr />
        <h2>Visibility</h2>
        <Toggle
          value={ state.value2 }
          onChange={ this.onChange.bind(this, 2) }
          cssClasses="visibility"/>
        &nbsp;
        <Toggle
          cssClasses="visibility"/>

        <hr />
        <h2>Logic</h2>
        <Toggle
          id="isVisible"
          value={ state.value3 }
          onChange={ this.onChange.bind(this, 3) }
          cssClasses="logic"/>
        &nbsp;
        <Toggle
          cssClasses="logic"/>

      </div>
    );
  }

}
