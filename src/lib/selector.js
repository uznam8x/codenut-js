define( ['./core'], (Codenut) => {
  'use strict';
  Codenut.selector = (query) => {
    return document.querySelectorAll(query);
  }
});