import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Label from '../src/Label';

describe('Label', () => {

  it('renders children as content', () => {
    const wrapper = shallow(<Label>The truth</Label>);
    expect(wrapper.text()).to.include('The truth');
  });

  it('renders as success', () => {
    const wrapper = shallow(<Label success/>);
    expect(wrapper.props().className).to.include('success');
  });

  it('renders as warning', () => {
    const wrapper = shallow(<Label warning/>);
    expect(wrapper.props().className).to.include('warning');
  });

  it('renders as severe', () => {
    const wrapper = shallow(<Label severe/>);
    expect(wrapper.props().className).to.include('severe');
  });

  it('renders as critical', () => {
    const wrapper = shallow(<Label critical/>);
    expect(wrapper.props().className).to.include('critical');
  });

});
