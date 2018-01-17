import React from 'react';

import OutsideClick from '../src/OutsideClick';

export default class OutsideClickBox extends React.Component {

  constructor() {
    super();
  }

  render() {
    return (
      <div>

        <OutsideClick onClickOutside={ () => { window.console.log('clicked outside'); } }>
          <div>HELLO</div>
        </OutsideClick>

      </div>
    );
  }

}
