import React, { Component, PropTypes } from 'react';

class OutsideClick extends Component {

  constructor(...args) {
    super(...args);
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    if (!this.rootNode.contains(event.target)) {
      this.props.onClickOutside && this.props.onClickOutside();
    }
  }

  componentDidMount() {
    document.body.addEventListener('click', this.onClick, false);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.onClick, false);
  }

  render() {
    return (
      <div ref={(node) => { this.rootNode = node; }}>
        {this.props.children}
      </div>
    );
  }
}

OutsideClick.propTypes = {
  onClickOutside: PropTypes.func,
  children: PropTypes.node
};

export default OutsideClick;
