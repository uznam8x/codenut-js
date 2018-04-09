define(['./core'], (Codenut) => {
  'use strict';
  Codenut.element = (el) => {
    return {
      el: el,
      offset: function () {
        let el = this.el;
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
      getBoundingClientRect: function () {
        return JSON.parse(JSON.stringify(this.el.getBoundingClientRect()));
      },
      closest: function (selector) {
        return this.el.closest(selector);
      },
      setAttribute: function (obj) {
        let el = this.el;
        for (let key in obj) {
          el.setAttribute(key, obj[key]);
        }
        return el;
      },
      removeAttribute: function (obj) {
        let el = this.el;
        for (let key in obj) {
          el.removeAttribute(key);
        }
      }
    };
  }
});