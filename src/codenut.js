module.exports = (() => {
  'use strict';
  require('./lib/polyfill');
  require('./lib/core');
  require('./lib/request');
  require('./lib/selector');
  require('./lib/screen');
  require('./lib/util');
  require('./lib/event');
  require('./lib/component');
})();
