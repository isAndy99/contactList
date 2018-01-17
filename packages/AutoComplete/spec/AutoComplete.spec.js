import React from 'react';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import ReactTestUtils from 'react-addons-test-utils';

import AutoComplete from '../src/AutoComplete';

const noOp = () => {};

describe('AutoComplete', () => {
  const items = [
    { id: 1, label: 'l1', profileName: 'p1' }
  ];
  const selectedItem = {
    id: 1,
    label: 'l1',
    profileName: 'p1'
  };

  context('Uniqueness of ids', () => {
    it('sets different ids for two component instances', () => {
      const first = shallow(<AutoComplete/>);
      const second = shallow(<AutoComplete/>);
      const id1 = first.find('input').first().prop('id');
      const id2 = second.find('input').first().prop('id');
      expect(id1).not.to.eql(id2);
    });
  });

  it('renders selected item', () => {
    const wrapper = shallow(<AutoComplete items={ items } selectedItem={ selectedItem }/>);
    expect(wrapper.find('input').first().props().value).to.eql('l1');
  });

  it('renders specified placeholder', () => {
    const wrapper = shallow(<AutoComplete placeholder="placeholder text"/>);
    expect(wrapper.find('input').first().props().value).to.eql('placeholder text');
  });

  it('renders specified creationHint', () => {
    const wrapper = mount(<AutoComplete creationHint="hint text" onCreateItem={ noOp }/>);
    ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
    expect(wrapper.find('[data-cls="creationHint"]').text()).to.eql('hint text');
  });

  it('renders remove icon if there is a selectedItem', () => {
    const wrapper = shallow(<AutoComplete items={ items } selectedItem={ selectedItem }/>);
    expect(wrapper.find('[data-cls="removeIcon"]').length).to.eql(1);
  });

  it('does not render remove icon if there is no selectedItem', () => {
    const wrapper = shallow(<AutoComplete/>);
    expect(wrapper.find('[data-cls="removeIcon"]').length).to.eql(0);
  });

  it('does not render remove icon if list is expanded', () => {
    const wrapper = mount(<AutoComplete items={ items } selectedItem={ selectedItem }/>);
    ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
    expect(wrapper.find('[data-cls="removeIcon"]').length).to.eql(0);
  });

  context('callbacks', () => {
    it('onClearSelection is called when clicking remove icon', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onClearSelection={ callback } items={ items } selectedItem={ selectedItem }/>);
      ReactTestUtils.Simulate.click(wrapper.find('[data-cls="removeIcon"]').first().node);
      expect(callback.called).to.be.true;
    });

    it('onCreateItem is called when selecting create item', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onCreateItem={ callback }/>);
      ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
      wrapper.setState({ searchTerm: 'a' }, () => {
        ReactTestUtils.Simulate.click(wrapper.find('[data-cls="createItem"]').first().node);
        expect(callback.called).to.be.true;
      });
    });

    it('onCreateItem is called with corect params when selecting create item', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onCreateItem={ callback }/>);
      ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
      wrapper.setState({ searchTerm: 'a' }, () => {
        ReactTestUtils.Simulate.click(wrapper.find('[data-cls="createItem"]').first().node);
        expect(callback.calledWithExactly('a')).to.be.true;
      });
    });

    it('onSelectItem is called when selecting an existing item', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onSelectItem={ callback } items={ items }/>);
      ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
      ReactTestUtils.Simulate.click(wrapper.find('li').first().node);
      expect(callback.called).to.be.true;
    });

    it('onSelectItem is called with corect params when selecting an existing item', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onSelectItem={ callback } items={ items }/>);
      ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
      ReactTestUtils.Simulate.click(wrapper.find('li').first().node);
      expect(callback.calledWithExactly({ id: 1, label: 'l1', profileName: 'p1' })).to.be.true;
    });

    it('onInput is called when typing inside input', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onInput={ callback }/>);
      let node = wrapper.find('input').first().node;
      node.value = 'a';
      ReactTestUtils.Simulate.change(node);
      expect(callback.called).to.be.true;
    });

    it('onInput is called with corect params when typing inside input', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onInput={ callback }/>);
      let node = wrapper.find('input').first().node;
      node.value = 'a';
      ReactTestUtils.Simulate.change(node);
      expect(callback.calledWithExactly('a')).to.be.true;
    });

    it('onExpand is called when expanding the list', () => {
      const callback = sinon.spy();
      const wrapper = mount(<AutoComplete onExpand={ callback }/>);
      ReactTestUtils.Simulate.click(wrapper.find('button').first().node); // expand list
      expect(callback.called).to.be.true;
    });
  });

});
