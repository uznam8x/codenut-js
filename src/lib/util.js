define( ['./core'], (Codenut) => {
  'use strict';
  Codenut.util = {
    guid: () => {
      const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    },

    uuid: () => {
      let d = new Date().getTime();
      if (window.performance && typeof window.performance.now === 'function') {
        d += window.performance.now();
      }

      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    },
  };
});