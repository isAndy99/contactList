process.env.NODE_ENV = 'test';

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
['.png', '.jpg'].forEach(ext => {
  require.extensions[ext] = () => null;
});

// we still need to parse scss, because we use postcss
// https://gist.github.com/mmrko/288d159a55adf1916f71
const hook = require('css-modules-require-hook');
const sass = require('node-sass');
hook({
  extensions: ['.scss', '.css'],
  preprocessCss: function(data) {
    return sass.renderSync({
      data: data,
      includePaths: ['components/']
    }).css;
  }
});

// setup necessary to be able to use enzyme's mount
const { JSDOM } = require('jsdom');
const exposedProperties = ['window', 'navigator', 'document'];
const win = new JSDOM('').window;
global.window = win;
global.document = win.document;

Object.keys(document.defaultView).forEach(property => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};
