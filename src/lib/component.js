define(['./core'], (Codenut) => {
  'use strict';

  const Initialize = function (name, init) {
    let component = [];
    _.each(document.documentElement.querySelectorAll('[data-codenut="' + name + '"]'), (node) => {
      if (!node.getAttribute('data-codenut-status')) {
        node.setAttribute('data-codenut-status', 'initialized');
        component.push(node);
      }
    });
    init(component);

    if (Codenut.request().debug && Codenut.request().debug === 'true') {
      console.log('%ccodenut component : "' + name + '" initialized', 'color:#133783');
    }
  };

  Codenut.component = function (name, init) {
    if (!init) {
      throw new Error('not found initialize method in ' + name);
    }

    const initialize = new Initialize(name, init);
    document.addEventListener(Codenut.Event.DOM_MODIFIED, initialize);
    document.addEventListener('DOMContentLoaded', initialize);
  };

});