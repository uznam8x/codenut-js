(function () {
  if (typeof window.Element.prototype.matches !== 'function') {
    window.Element.prototype.matches = window.Element.prototype.msMatchesSelector || window.Element.prototype.mozMatchesSelector || window.Element.prototype.webkitMatchesSelector || function matches(selector) {
      let element = this;
      let elements = (element.document || element.ownerDocument).querySelectorAll(selector);
      let index = 0;
      while (elements[index] && elements[index] !== element) {
        ++index;
      }
      return Boolean(elements[index]);
    };
  }
  if (typeof window.Element.prototype.closest !== 'function') {
    window.Element.prototype.closest = function closest(selector) {
      let element = this;
      while (element && element.nodeType === 1) {
        if (element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
      }
      return null;
    };
  }
})();

(function () {
  if (!document.documentElement.classList) {

    // helpers
    let regExp = function (name) {
      return new RegExp('(^| )' + name + '( |$)');
    };
    let forEach = function (list, fn, scope) {
      for (var i = 0; i < list.length; i++) {
        fn.call(scope, list[i]);
      }
    };

    // class list object with basic methods
    function ClassList(element) {
      this.element = element;
    }

    ClassList.prototype = {
      add: function () {
        forEach(arguments, function (name) {
          if (!this.contains(name)) {
            this.element.className += this.element.className.length > 0 ? ' ' + name : name;
          }
        }, this);
      },
      remove: function () {
        forEach(arguments, function (name) {
          this.element.className =
            this.element.className.replace(regExp(name), '');
        }, this);
      },
      toggle: function (name) {
        return this.contains(name)
          ? (this.remove(name), false) : (this.add(name), true);
      },
      contains: function (name) {
        return regExp(name).test(this.element.className);
      },
      // bonus..
      replace: function (oldName, newName) {
        this.remove(oldName), this.add(newName);
      }
    };

    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
      Object.defineProperty(Element.prototype, 'classList', {
        get: function () {
          return new ClassList(this);
        }
      });
    }

    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
      DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }
  }


})();

// Object
(function () {
  if (!Object.keys) {
    Object.keys = (function () {
      'use strict';
      var hasOwnProperty = Object.prototype.hasOwnProperty,
        hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
        dontEnums = [
          'toString',
          'toLocaleString',
          'valueOf',
          'hasOwnProperty',
          'isPrototypeOf',
          'propertyIsEnumerable',
          'constructor'
        ],
        dontEnumsLength = dontEnums.length;

      return function (obj) {
        if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
          throw new TypeError('Object.keys called on non-object');
        }

        var result = [], prop, i;

        for (prop in obj) {
          if (hasOwnProperty.call(obj, prop)) {
            result.push(prop);
          }
        }

        if (hasDontEnumBug) {
          for (i = 0; i < dontEnumsLength; i++) {
            if (hasOwnProperty.call(obj, dontEnums[i])) {
              result.push(dontEnums[i]);
            }
          }
        }
        return result;
      };
    }());
  }

  if (typeof Object.assign != 'function') {
    (function () {
      Object.assign = function (target) {
        'use strict';
        if (target === undefined || target === null) {
          throw new TypeError('Cannot convert undefined or null to object');
        }

        var output = Object(target);
        for (var index = 1; index < arguments.length; index++) {
          var source = arguments[index];
          if (source !== undefined && source !== null) {
            for (var nextKey in source) {
              if (source.hasOwnProperty(nextKey)) {
                output[nextKey] = source[nextKey];
              }
            }
          }
        }
        return output;
      };
    })();
  }

  if (typeof Object.create != 'function') {
    Object.create = (function (undefined) {
      var Temp = function () {
      };
      return function (prototype, propertiesObject) {
        if (prototype !== Object(prototype) && prototype !== null) {
          throw TypeError('Argument must be an object, or null');
        }
        Temp.prototype = prototype || {};
        if (propertiesObject !== undefined) {
          Object.defineProperties(Temp.prototype, propertiesObject);
        }
        var result = new Temp();
        Temp.prototype = null;
        // Object.create(null)인 경우 모방
        if (prototype === null) {
          result.__proto__ = null;
        }
        return result;
      };
    })();
  }
})();

// Array
(function () {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      let k;
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }
      let o = Object(this);
      let len = o.length >>> 0;
      if (len === 0) {
        return -1;
      }
      let n = fromIndex | 0;
      if (n >= len) {
        return -1;
      }
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      while (k < len) {
        if (k in o && o[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    };
  }

  if (!Array.prototype.find) {
    Object.defineProperty(Array.prototype, 'find', {
      value: function (predicate) {
        if (this == null) {
          throw new TypeError('"this" is null or not defined');
        }
        let o = Object(this);
        let len = o.length >>> 0;
        if (typeof predicate !== 'function') {
          throw new TypeError('predicate must be a function');
        }
        let thisArg = arguments[1];
        let k = 0;
        while (k < len) {
          let kValue = o[k];
          if (predicate.call(thisArg, kValue, k, o)) {
            return kValue;
          }
          k++;
        }
        return undefined;
      }
    });
  }

  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
      let T, k;
      if (this === null) {
        throw new TypeError(' this is null or not defined');
      }

      let O = Object(this);
      let len = O.length >>> 0;

      if (typeof callback !== "function") {
        throw new TypeError(callback + ' is not a function');
      }

      if (arguments.length > 1) {
        T = thisArg;
      }

      k = 0;

      while (k < len) {
        let kValue;
        if (k in O) {
          kValue = O[k];
          callback.call(T, kValue, k, O);
        }
        k++;
      }

    };
  }
})();

// String
(function () {
  if (!String.prototype.trim) {
    String.prototype.trim = function () {
      return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
    };
  }
})();

// Event
(function () {
  function CustomEvent ( event, params ) {
    params = params || {};
    const obj = {bubbles: false, cancelable: false, detail: undefined};
    for (let key in obj) {
      if (params[key]) {
        obj[key] = params[key];
        delete params[key];
      }
    }

    let evt = document.createEvent('CustomEvent');
    evt.initCustomEvent(event, obj.bubbles, obj.cancelable, obj.detail);
    for (let key in params) {
      evt[key] = params[key];
    }
    return evt;
  }

  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
})();