define(['./core'], (Codenut) => {
  'use strict';
  const MobileDetect = require('mobile-detect');

  // style parse
  let style = null;
  if (window.getComputedStyle && window.getComputedStyle(document.documentElement, '::before')) {
    style = window.getComputedStyle(document.documentElement, '::before').content;
  }

  Codenut.Event = _.merge(Codenut.Event, {
    CHANGE_SCREEN: 'Event.CHANGE_SCREEN'
  });
  Codenut.screen = {
    mode: null,
    width: window.innerWidth,
    height: window.innerHeight,
    breakpoint: {},
    device: 'pc',
    os: 'window',
    browser: '',
    scroll: {x: 0, y: 0}
  };

  // break point
  const resize = () => {
    Codenut.screen = _.merge(Codenut.screen, {
      width: window.innerWidth,
      height: window.innerHeight,
      breakpoint: {},
    });
    if (style) {
      style = style
        .replace(/^['"]+|\s+|\\|(;\s?})+|['"]$/g, '')
        .replace(/\(/g, '{')
        .replace(/\)/g, '}')
        .replace(/:[\"]?([a-zA-Z0-9]*)([,|\}])/g, ':"$1"$2');
      let content = eval('(' + style + ')');

      if (content.hasOwnProperty('breakpoint')) {
        Codenut.screen.breakpoint = content.breakpoint;
        for (let key in Codenut.screen.breakpoint) {
          if (Codenut.screen.breakpoint.hasOwnProperty(key)) {
            Codenut.screen.breakpoint[key] = parseInt(Codenut.screen.breakpoint[key]);
          }
        }

        const MODE = Codenut.screen.mode;

        if (Codenut.screen.width >= Codenut.screen.breakpoint['xs']) Codenut.screen.mode = 'xs';
        if (Codenut.screen.width >= Codenut.screen.breakpoint['sm']) Codenut.screen.mode = 'sm';
        if (Codenut.screen.width >= Codenut.screen.breakpoint['md']) Codenut.screen.mode = 'md';
        if (Codenut.screen.width >= Codenut.screen.breakpoint['lg']) Codenut.screen.mode = 'lg';
        if (Codenut.screen.width >= Codenut.screen.breakpoint['xl']) Codenut.screen.mode = 'xl';

        if (MODE !== Codenut.screen.mode) {
          document.dispatchEvent(new CustomEvent(Codenut.Event.CHANGE_SCREEN, {screen: Codenut.screen}));
        }
      }

      document.querySelector('html').setAttribute('data-screen-mode', Codenut.screen.mode);
    }
  };

  window.removeEventListener('resize', resize);
  window.addEventListener('resize', resize);
  document.addEventListener("DOMContentLoaded", resize);

  // device
  const md = new MobileDetect(window.navigator.userAgent);
  let device = 'pc';
  if (md.mobile()) device = 'mobile';
  if (md.tablet()) device = 'tablet';
  Codenut.screen.device = device;

  // os
  Codenut.screen.os = md.os() || window.navigator.platform;
  Codenut.screen.os = Codenut.screen.os.toLowerCase();

  document.querySelector('html').setAttribute('data-screen-device', Codenut.screen.device);
  document.querySelector('html').setAttribute('data-screen-os', Codenut.screen.os);

  // browser
  const browser = {
    'opera': (() => {
      return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    })(),
    'firefox': (() => {
      return typeof InstallTrigger !== 'undefined';
    })(),
    'safari': (() => {
      return /constructor/i.test(window.HTMLElement) || (function (p) {
        return p.toString() === "[object SafariRemoteNotification]";
      })(!window['safari'] || safari.pushNotification);
    })(),
    'chrome': (() => {
      return !!window.chrome && !!window.chrome.webstore;
    })(),
    'ie': (() => {
      return false || !!document.documentMode;
    })(),
  };
  browser['edge'] = (() => {
    return !browser.ie && !!window.StyleMedia;
  })();

  for (let key in browser) {
    if (browser[key]) {
      Codenut.screen.browser = key;
    }
  }
  document.querySelector('html').setAttribute('data-screen-browser', Codenut.screen.browser);

  // scroll
  Codenut.Event = _.merge(Codenut.Event, {
    SCROLL: 'Event.SCROLL'
  });
  window.addEventListener('scroll', (e) => {
    Codenut.screen.scroll = {
      y: document.documentElement.scrollTop || window.pageYOffset,
      x: document.documentElement.scrollLeft || window.pageXOffset
    };
    document.dispatchEvent(new CustomEvent(Codenut.Event.SCROLL, {scroll: Codenut.screen.scroll}));
  })
});