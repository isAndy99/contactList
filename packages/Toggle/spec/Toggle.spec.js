import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Toggle from '../src/Toggle';

describe('Toggle', () => {

  context('uniqueness of ids', () => {
    it('sets different ids for two component instances', () => {
      const first = shallow(<Toggle/>);
      const second = shallow(<Toggle/>);
      const id1 = first.find('input').prop('id');
      const id2 = second.find('input').prop('id');
      expect(id1).not.to.eql(id2);
    });

    it('uses id from props if set', () => {
      const wrapper = shallow(<Toggle id="check-42"/>);
      const checkbox = wrapper.find({ type: 'checkbox' });
      expect(checkbox.props().id).to.eql('check-42');
      const label = wrapper.find('label');
      expect(label.props().htmlFor).to.eql('check-42');
    });
  });

  it('renders as not set by default', () => {
    const wrapper = shallow(<Toggle/>);
    const checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().checked).to.be.false;
  });

  it('renders as set', () => {
    const wrapper = shallow(<Toggle value={ true }/>);
    const checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().checked).to.be.true;
  });

  it('disables if needed', () => {
    const wrapper = shallow(<Toggle disabled={ true }/>);
    const checkbox = wrapper.find({ type: 'checkbox' });
    expect(checkbox.props().disabled).to.be.true;
  });

  context('onChange handler', () => {
    it('is called on change', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(<Toggle onChange={ onChange }/>);
      const checkbox = wrapper.find({ type: 'checkbox' });
      checkbox.simulate('change', { target: { checked: true } });
      expect(onChange.calledOnce).to.be.true;
      expect(onChange.firstCall.args[0]).to.be.true;
    });

    it('disables checkbox if it is missing', () => {
      const wrapper = shallow(<Toggle/>);
      const checkbox = wrapper.find({ type: 'checkbox' });
      expect(checkbox.props().disabled).to.be.true;
    });

    it('does not get called when disabled', () => {
      const onChange = sinon.spy();
      const wrapper = shallow(<Toggle onChange={ onChange } disabled={ true }/>);
      const checkbox = wrapper.find({ type: 'checkbox' });
      checkbox.simulate('change');
      expect(onChange.notCalled).to.be.true;
    });
  });

});

