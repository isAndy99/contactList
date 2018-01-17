import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import { OutsideClick } from '../../OutsideClick';
import styles from '../scss/AutoComplete.scss';

let count = 1;
const KEYCODE_UP = 38;
const KEYCODE_DOWN = 40;
const KEYCODE_ENTER = 13;
const KEYCODE_ESCAPE = 27;

class AutoComplete extends Component {

  constructor(...args) {
    super(...args);
    this.id = `_autocomplete_${count++}`;

    this.state = {
      isExpanded: false,
      searchTerm: null,
      highlightedItem: -1
    };
    this.clearInput = this.clearInput.bind(this);
    this.hideDropdownList = this.hideDropdownList.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.showDropdownList = this.showDropdownList.bind(this);
    this.toggleDropDownList = this.toggleDropDownList.bind(this);
    this.renderItem = this.renderItem.bind(this);
    this.preventBlur = this.preventBlur.bind(this);
  }

  showDropdownList() {
    if (this.state.isExpanded) {
      return null;
    }

    const { onExpand } = this.props;
    onExpand && onExpand();
    this.setState({
      isExpanded: true,
      searchTerm: ''
    }, () => {
      this.textInput.focus();
    });
  }

  hideDropdownList() {
    if (!this.state.isExpanded) {
      return null;
    }

    this.setState({
      isExpanded: false,
      searchTerm: null,
      highlightedItem: -1
    }, () => {
      this.textInput.blur();
    });
  }

  toggleDropDownList() {
    if (this.state.isExpanded) {
      this.hideDropdownList();
    } else {
      this.showDropdownList();
    }
  }

  onChange(e) {
    const searchTerm = e.target.value;
    const { onInput } = this.props;
    onInput && onInput(searchTerm);

    this.setState({ searchTerm, highlightedItem: -1 });
  }

  clearInput() {
    const { onClearSelection } = this.props;
    this.showDropdownList();
    onClearSelection && onClearSelection();
  }

  onSelect(item) {
    const { onSelectItem } = this.props;
    this.hideDropdownList();
    onSelectItem && onSelectItem(item);
  }

  doesLabelExist(label) {
    return !!this.props.items.find((item) => item.label === label);
  }

  shouldShowCreateItem() {
    const { searchTerm } = this.state;
    return this.props.allowDuplicateLabel || this.props.onCreateItem && searchTerm && !this.doesLabelExist(searchTerm);
  }

  onCreate(searchTerm) {
    this.textInput.blur();
    this.hideDropdownList();
    this.props.onCreateItem(searchTerm);
  }

  preventBlur(e) {
    // since input blur would be triggered before click,
    // we prevent the blur, to preserve the click
    e.preventDefault();
  }

  scrollIntoViewIfNeeded(itemIndex, direction) {
    const item = this[`itemRef-${itemIndex}`];

    if (!item) {
      return;
    }

    const listScrollTop = this.itemsList.scrollTop;

    const scrollIsTop = listScrollTop === 0;
    const scrollIsBottom = listScrollTop === this.itemsList.scrollHeight - this.itemsList.offsetHeight;

    const shouldScrollDown = item.offsetTop >= this.itemsList.offsetHeight + listScrollTop;
    const shouldScrollUp = item.offsetTop < listScrollTop;

    if (scrollIsTop && direction < 0 && shouldScrollDown) {
      this.itemsList.scrollTop = this.itemsList.scrollHeight - this.itemsList.offsetHeight;
      return;
    }

    if (scrollIsBottom && direction > 0 && shouldScrollUp) {
      this.itemsList.scrollTop = 0;
      return;
    }

    if (shouldScrollDown) {
      this.itemsList.scrollTop += item.offsetHeight;
    }

    if (shouldScrollUp) {
      this.itemsList.scrollTop -= item.offsetHeight;
    }
  }

  handleKeyDown(e) {
    const keyCode = e.keyCode;
    const { searchTerm, highlightedItem } = this.state;

    let nextHighlightedItem = highlightedItem;
    let itemsCount = this.props.items.length;

    if (this.shouldShowCreateItem()) {
      itemsCount++;
    }

    const mapKeyCodesToDirection = {
      [KEYCODE_UP]: -1,
      [KEYCODE_DOWN]: 1
    };

    if ([KEYCODE_UP, KEYCODE_DOWN].indexOf(keyCode) !== -1) {

      e.preventDefault();
      nextHighlightedItem += mapKeyCodesToDirection[keyCode];

      if (nextHighlightedItem < 0) {
        nextHighlightedItem = itemsCount - 1;
      }

      if (nextHighlightedItem === itemsCount) {
        nextHighlightedItem = 0;
      }

      this.setState({
        highlightedItem: nextHighlightedItem
      }, () => {
        this.scrollIntoViewIfNeeded(nextHighlightedItem, mapKeyCodesToDirection[keyCode]);
      });
    }

    if (keyCode === KEYCODE_ENTER) {
      if (highlightedItem === itemsCount - 1 && this.shouldShowCreateItem()) {
        this.onCreate(searchTerm);
      } else if (highlightedItem >= 0) {
        this.onSelect(this.props.items[highlightedItem]);
      }
    }

    if (keyCode === KEYCODE_ESCAPE) {
      this.hideDropdownList();
    }
  }

  renderClearIcon() {
    if (this.state.isExpanded || !this.props.selectedItem) {
      return null;
    }
    return (
      <span
        data-cls="removeIcon"
        className={`${styles.removeIcon} glyphicons glyphicons-remove-sign`}
        onClick={this.clearInput}
      />
    );
  }

  renderInputField() {
    const { selectedItem, placeholder, itemType } = this.props;
    const { isExpanded, searchTerm } = this.state;

    let value = isExpanded ? '' : placeholder;

    if (selectedItem) {
      value = selectedItem.label;
    }

    if (isExpanded && searchTerm !== null) {
      value = searchTerm;
    }

    return (
      <div className={styles.field}>
        <label htmlFor={this.id}>{itemType}</label>
        <input
          type="text"
          id={this.id}
          ref={(node) => { this.textInput = node; }}
          value={value}
          onChange={this.onChange}
          onKeyDown={this.handleKeyDown}
          onFocus={this.showDropdownList}
        />
        {this.renderClearIcon()}
        <button
          className={styles.triggerBtn}
          tabIndex="-1"
          onMouseDown={this.preventBlur}
          onClick={this.toggleDropDownList}
        />
      </div>
    );
  }

  renderItem(item, index) {
    const classes = classNames(styles.item, {
      [styles.highlighted]: index === this.state.highlightedItem
    });

    return (
      <li
        className={classes}
        key={item.id}
        ref={(node) => { this[`itemRef-${index}`] = node; }}
        onClick={this.onSelect.bind(this, item)}
      >
        <span className={styles.label}>{item.label}</span>
        <span className={styles.description}>{item.description}</span>
      </li>
    );
  }

  renderItems() {
    const { items } = this.props;

    if (this.state.searchTerm || items.length) {

      if (items.length) {
        return items.map(this.renderItem);
      }

      return (
        <li className={styles.noResults}>
          No result found
				</li>
      );
    }

    return (
      <li className={styles.noItems}>
        None available
			</li>
    );
  }

  renderCreateItem() {
    const { items, creationHint, onCreateItem } = this.props;
    const { searchTerm, highlightedItem } = this.state;

    if (!onCreateItem) {
      return null;
    }

    if (!searchTerm) {
      return (
        <div data-cls="creationHint" className={styles.creationHint}>
          {creationHint}
        </div>
      );

    }

    if (this.shouldShowCreateItem()) {

      const classes = classNames(styles.createItem, {
        [styles.highlighted]: highlightedItem === items.length
      });

      return (
        <div
          data-cls="createItem"
          className={classes}
          onClick={this.onCreate.bind(this, searchTerm)}
          ref={(node) => { this[`itemRef-${items.length + 1}`] = node; }}
        >
          <span>Create: </span>
          <span className={styles.searchTerm}>{searchTerm}</span>
          <span className={`${styles.createIcon} glyphicons glyphicons-arrow-left`} />
        </div>
      );
    }
  }

  renderDropdownList() {
    if (!this.state.isExpanded) {
      return null;
    }
    return (
      <div className={styles.dropdown} onMouseDown={(this.preventBlur)}>
        <ul
          className={styles.list}
          ref={(node) => { this.itemsList = node; }}
        >
          {this.renderItems()}
        </ul>
        {this.renderCreateItem()}
      </div>
    );
  }

  render() {
    const classes = classNames(styles.autoComplete, {
      [styles.focused]: this.state.isExpanded
    });
    return (
      <OutsideClick onClickOutside={this.hideDropdownList}>
        <div className={classes}>
          {this.renderInputField()}
          {this.renderDropdownList()}
        </div>
      </OutsideClick>
    );
  }
}

AutoComplete.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({ // current existing items (contextually / on this profile)
    id: PropTypes.number,
    label: PropTypes.string,
    description: PropTypes.string
  })),
  selectedItem: PropTypes.shape({ // current selected item
    id: PropTypes.number,
    label: PropTypes.string,
    description: PropTypes.string
  }),
  itemType: PropTypes.oneOfType([ // shown on input label
    PropTypes.string,
    PropTypes.node
  ]),
  placeholder: PropTypes.string, // text shown in the input when there is no item selected
  creationHint: PropTypes.string, // hint text shown on bottom of search results when input & search results are empty
  onClearSelection: PropTypes.func, // e.g. handle removal from persistent storage
  onCreateItem: PropTypes.func,// e.g. add MSC canvas representation, add to persistent storage
  onSelectItem: PropTypes.func, // e.g. set selected item in persistent storage
  onInput: PropTypes.func, // should trigger a re-render with new props.items that match given searchTerm as param
  onExpand: PropTypes.func, // to execute when the list expands (e.g. reset items list)
  allowDuplicateLabel: PropTypes.bool
};

AutoComplete.defaultProps = {
  items: [],
  selectedItem: null,
  itemType: 'Item',
  placeholder: 'Select or find an item here',
  creationHint: 'Type to search or create'
};

export default AutoComplete;
