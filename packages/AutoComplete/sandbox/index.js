import React from 'react';
import Immutable from 'immutable';

import AutoComplete from '../src/AutoComplete';

export default class AutoCompleteBox extends React.Component {

  constructor() {
    super();
    this.state = {
      set1: {
        items: [],
        itemsToShow: [],
        selectedItem: null
      },
      set2: {
        items: [
          { id: 1, label: 'CRM Contract', description: 'Untitled Profile 1 - Template 1' },
          { id: 2, label: 'CRM App Contract', description: 'Untitled Profile 1 - Template 1' },
          { id: 3, label: 'DB App Contract', description: 'Untitled Profile 1 - Template 1' }
        ],
        itemsToShow: [
          { id: 1, label: 'CRM Contract', description: 'Untitled Profile 1 - Template 1' },
          { id: 2, label: 'CRM App Contract', description: 'Untitled Profile 1 - Template 1' },
          { id: 3, label: 'DB App Contract', description: 'Untitled Profile 1 - Template 1' }
        ],
        selectedItem: { id: 1, label: 'CRM Contract', description: 'Untitled Profile 1 - Template 1' }
      },
      set3: {
        items: [
          { id: 1, label: 'CRM Contract', description: 'Untitled Profile 1 - Template 1' },
          { id: 2, label: 'CRM App Contract', description: 'CRM App Profile - App template' },
          { id: 3, label: 'CRM App Contract 2', description: 'CRM App Profile - App template' },
          { id: 4, label: 'CRM Con', description: 'Untitled Profile 1 - Template 1' },
          { id: 5, label: 'CRM App Con', description: 'CRM App Profile - App template' },
          { id: 6, label: 'CRM App Con 2', description: 'CRM App Profile - App template' },
          { id: 7, label: 'DB Reporting', description: 'CRM App Profile - App template' }
        ],
        itemsToShow: [
          { id: 1, label: 'CRM Contract', description: 'Untitled Profile 1 - Template 1' },
          { id: 2, label: 'CRM App Contract', description: 'CRM App Profile - App template' },
          { id: 3, label: 'CRM App Contract 2', description: 'CRM App Profile - App template' },
          { id: 4, label: 'CRM Con', description: 'Untitled Profile 1 - Template 1' },
          { id: 5, label: 'CRM App Con', description: 'CRM App Profile - App template' },
          { id: 6, label: 'CRM App Con 2', description: 'CRM App Profile - App template' },
          { id: 7, label: 'DB Reporting', description: 'CRM App Profile - App template' }
        ],
        selectedItem: { id: 3, label: 'CRM App Contract 2', description: 'CRM App Profile - App template' }
      }
    };
  }

  onClearSelection(index) {
    const instance = `set${index}`;
    const newState = Immutable.Map(this.state[instance]).set('selectedItem', null).toJS();
    this.setState({ [instance]: newState });
  }

  onCreateItem(index, label) {
    const instance = `set${index}`;
    const newItem = Immutable.Map({
      id: this.state[instance].items.length + 1,
      label,
      description: 'Untitled Profile 1 - Template 1'
    });

    const items = Immutable.List(this.state[instance].items).push(newItem);
    const newState = Immutable.Map(this.state[instance]).
      set('selectedItem', newItem).
      set('items', items).
      set('itemsToShow', items);

    this.setState({ [instance]: newState.toJS() });
  }

  onSelectItem(index, item) {
    const instance = `set${index}`;
    const newState = Object.assign({}, this.state[instance], { selectedItem: item });
    this.setState({ [instance]: newState });
  }

  isValidItem(searchTerm, item) {
    return !searchTerm || item.label.indexOf(searchTerm) !== -1;
  }

  onInput(index, searchTerm) {
    const instance = `set${index}`;
    let itemsToShow = this.state[instance].items.filter(this.isValidItem.bind(this, searchTerm));

    const newState = Object.assign({}, this.state[instance], { itemsToShow });
    this.setState({ [instance]: newState });
  }

  onExpand(index) {
    const instance = `set${index}`;
    const newState = Object.assign({}, this.state[instance], { itemsToShow: this.state[instance].items });
    this.setState({ [instance]: newState });
  }

  render() {
    const state = this.state;
    return (
      <div style={{'width': '500px'}}>

        <AutoComplete
          items={state.set1.itemsToShow}
          selectedItem={state.set1.selectedItem}
          placeholder="Select or find a contract here"
          creationHint="Type to search or create contract"
          itemType="Contract"
          onClearSelection={this.onClearSelection.bind(this, 1)}
          onCreateItem={this.onCreateItem.bind(this, 1)}
          onSelectItem={this.onSelectItem.bind(this, 1)}
          onInput={this.onInput.bind(this, 1)}
          onExpand={this.onExpand.bind(this, 1)}
        />

        <hr />

        <AutoComplete
          items={state.set2.itemsToShow}
          selectedItem={state.set2.selectedItem}
          placeholder="Select or find a contract here"
          creationHint="Type to search or create contract"
          itemType="Contract"
          onClearSelection={this.onClearSelection.bind(this, 2)}
          onCreateItem={this.onCreateItem.bind(this, 2)}
          onSelectItem={this.onSelectItem.bind(this, 2)}
          onInput={this.onInput.bind(this, 2)}
          onExpand={this.onExpand.bind(this, 2)}
        />

        <hr />

        <AutoComplete
          items={state.set3.itemsToShow}
          selectedItem={state.set3.selectedItem}
          onClearSelection={this.onClearSelection.bind(this, 3)}
          onCreateItem={this.onCreateItem.bind(this, 3)}
          onSelectItem={this.onSelectItem.bind(this, 3)}
          onInput={this.onInput.bind(this, 3)}
          onExpand={this.onExpand.bind(this, 3)}
        />

      </div>
    );
  }

}
