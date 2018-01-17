import { themr } from 'react-css-themr';

export const createThemedComponent = (name, Component, theme) =>
  class extends themr(name, theme)(Component) {
    static displayName = name;
  };
