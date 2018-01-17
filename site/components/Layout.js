import React from 'react';
import PropTypes from 'prop-types';

import logo from 'assets/cisco.png'; // eslint-disable-line
import styles from '../styles.scss';
import 'assets/glyphicons/glyphicons.css'; // eslint-disable-line

import Menu from '../components/Menu';
import Content from '../components/Content';
import Footer from '../components/Footer';

const Layout = ({ menu, selectedPage, onPageSelect, pageContent }) => (
  <div className={styles.container}>
    <div className={styles.side}>
      <Menu items={menu} selected={selectedPage} onSelect={onPageSelect} />
    </div>
    <div className={styles.main}>
      <Content>{pageContent}</Content>
      <Footer />
    </div>
  </div>
);

Layout.propTypes = {
  menu: PropTypes.object,
  selectedPage: PropTypes.string,
  onPageSelect: PropTypes.func,
  pageContent: PropTypes.node
};

export default Layout;
