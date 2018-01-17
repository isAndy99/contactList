'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

// we're using scss for themes, but after themes are resolved, all files become css files
// this plugin changes import statements from scss to css, so that imports still work
exports.default = function() {
  return {
    manipulateOptions(opts) {
      opts.resolveModuleSource = function(source) {
        return source.replace('.scss', '.css');
      };
    }
  };
};
