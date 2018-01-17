import React, { Component } from 'react';

import Label from '../src/Label';

export default class LabelBox extends Component {

  render() {
    return (
      <div>
        <h2>Standard</h2>
        <Label>default</Label>
        <br/>
        <Label success>success</Label>
        <br/>
        <Label warning>warning</Label>
        <br/>
        <Label severe>severe</Label>
        <br/>
        <Label critical>critical</Label>
        <hr/>
        <h2>In text</h2>
        <p>
          The truth is <Label success>out there</Label>.
        </p>
      </div>
    );
  }

}
