'use strict';
define(['./core'], (Codenut) => {
  var on = ['click', 'change', 'mouseenter', 'mouseleave', 'mousemove', 'mousewheel', 'focus', 'focusout', 'blur', 'submit', 'scroll'];

  const index = function (obj, is, value) {
    if (typeof is === 'string')
      return index(obj, is.split('.'), value);
    else if (is.length === 1 && value !== undefined)
      return obj[is[0]] = value;
    else if (is.length === 0)
      return obj;
    else
      return index(obj[is[0]], is.slice(1), value);
  };

  _.each(on, (node) => {
    document.addEventListener(node, function (e) {
      const el = e.target;
      if (el && el !== document) {
        const type = 'on' + node;
        let method = el.getAttribute(type) || null;
        let target = el;
        if (!method) {
          target = el.closest(`[${type}]`);
          if (target) {
            method = target.getAttribute(type);
          }
        }

        if (method) {
          const param = JSON.parse(method.replace(/'/g, '"'));
          let type = param.shift();
          let covert = null;
          try {
            covert = index(Codenut, type);
          } catch (e) {
          }
          if (!covert) covert = type;

          const event = new CustomEvent(covert, {
            delegateTarget: target,
            originalEvent: e,
            param: param
          });
          document.dispatchEvent(event);
        }
      }
    });
  });

  Codenut.Event = {
    DOM_MODIFIED: 'Event.DOM_MODIFIED'
  };
});

