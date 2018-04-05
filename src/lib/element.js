define(['./core'], (Codenut) => {
  'use strict';
  Codenut.element = {
    offset: (el) => {
      let x = 0;
      let y = 0;
      let width = el.offsetWidth;
      let height = el.offsetHeight;
      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        x += el.offsetLeft - el.scrollLeft;
        y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
      }
      return { top: y, left: x, width: width, height: height };
    },
    create: (node, option) => {
      let el = document.createElement(node);
      if (option) {
        for (let key in option) {
          if (key !== 'style') {
            el[key] = option[key];
          } else {
            for (let style in option[key]) {
              el.style[style] = option[key][style];
            }
          }
        }
      }
      return el;
    },
    append: (el, html) => {

    },
    prepend: (el, html) => {

    },
    next: (el) => {

    },
    prev: (el) => {

    }
  };
});