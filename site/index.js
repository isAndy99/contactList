import React from 'react';
import { render } from 'react-dom';

import { general } from './pages';
import Layout from './components/Layout';

const history = window.history;

const mappedPages = mapPages(general);

class Site extends React.Component {
  constructor() {
    super();

    this.onPageSelect = this.onPageSelect.bind(this);

    this.state = { page: null };

    window.onpopstate = event => {
      const newState = event.state;
      if (newState) {
        this.setState({ page: newState });
      } else {
        const current = this.state.page;
        history.replaceState(current, current.title);
      }
    };
  }

  componentWillMount() {
    const defaultState = getDefaultHistoryState();
    this.setState({ page: defaultState });

    if (!history.state) {
      const { title, name } = defaultState;
      history.replaceState(defaultState, title, '/' + name);
    }
  }

  render() {
    window.document.title = 'Nebula: ' + this.state.page.title;

    return (
      <Layout
        menu={{ general }}
        selectedPage={this.state.page.name}
        onPageSelect={this.onPageSelect}
        pageContent={this.renderActivePage()}
      />
    );
  }

  onPageSelect(page) {
    history.pushState(page, page.title, '/' + page.name);
    this.setState({ page });
  }

  renderActivePage() {
    const page = this.state.page;
    if (!page) {
      return null;
    }

    const demo = mappedPages[page.name].class;
    return React.createElement(demo);
  }
}

function getDefaultHistoryState() {
  const firstPage = general[0];
  return history.state || { title: firstPage.title, name: firstPage.id };
}

function mapPages(general) {
  let map = {};
  [...general].forEach(page => {
    const pageId = page.id;
    map[pageId] = page;
    if (!page.title) {
      map[pageId].title = pageId;
    }
  });
  return map;
}

render(<Site />, document.getElementById('site'));
