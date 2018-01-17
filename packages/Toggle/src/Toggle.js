import React, { Component, PropTypes } from 'react';

import styles from '../scss/Toggle.scss';

// this component could be used several times on page
// we need unique identifier for binding between input and label
let count = 1;

class Toggle extends Component {

  constructor(props) {
    super(props);
    this.id = props.id || `_toggle_${count++}`;
  }

  render() {
    const props = this.props;
    const disabled = props.disabled || !props.onChange;
    const handler = (props.onChange && !disabled)
      ? (e => { props.onChange(e.target.checked); })
      : null;
    // TODO: fix this to be able to use props.cssClasses without this map to postcss styles
    const cssMapping = {
      visibility: styles.visibility,
      logic: styles.logic
    };
    const cssClasses = [
      styles.ui,
      cssMapping[props.cssClasses],
      styles.onoffswitch,
      styles.switch,
      (disabled ? styles.disabled : '')
    ].join(' ');

    return (
      <div className={ cssClasses }>
        <input type="checkbox"
          id={ this.id }
          checked={ props.value }
          disabled={ disabled }
          onChange={ handler }
          className={ styles.onoffswitchCheckbox }/>
        <label htmlFor={ this.id }
          className={ styles.onoffswitchLabel }
          data-qa={ props.value ? 'on' : 'off' }>
          <div className={ styles.onoffswitchInner }>
            <span className={ 'glyphicons glyphicons-eye-open ' + styles.eyeOpened }/>
            <span className={ 'glyphicons glyphicons-eye-close ' + styles.eyeClosed }/>
          </div>
          <div className={ styles.onoffswitchStatus }/>
        </label>
      </div>
    );
  }

}

Toggle.propTypes = {
  id: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
  cssClasses: PropTypes.string,
  onChange: PropTypes.func
};

Toggle.defaultProps = {
  value: false,
  disabled: false,
  cssClasses: ''
};

export default Toggle;
