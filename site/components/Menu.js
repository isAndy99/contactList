import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Menu.scss';

class Menu extends Component {
  render() {
    const { general } = this.props.items;

    return (
      <nav className={styles.menu}>
        <ul className={styles.main}>
          {general.map(this.renderMenuItem.bind(this, 'main'))}
        </ul>
      </nav>
    );
  }

  renderMenuItem(level, page) {
    const name = page.id;
    const { selected, onSelect } = this.props;
    const className = selected === name ? styles[`${level}-active`] : '';

    return (
      <li className={styles[`${level}-item`]} key={name}>
        <a
          className={className}
          href={`/${name}`}
          onClick={e => {
            e.preventDefault();
            onSelect({ name, title: page.title });
          }}
        >
          {page.title}
        </a>
      </li>
    );
  }
}

Menu.propTypes = {
  items: PropTypes.shape({
    general: PropTypes.array,
    components: PropTypes.array,
    layouts: PropTypes.array
  }).isRequired,
  selected: PropTypes.string,
  onSelect: PropTypes.func.isRequired
};

export default Menu;
