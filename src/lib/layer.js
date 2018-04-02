define(['./core'], (Codenut) => {
  'use strict';
  require('../stylesheet/layer.scss');
  let timeout = null;
  Codenut.layer = {
    item: [],
    add: function (el) {
      const uuid = Codenut.util.uuid();
      el.setAttribute('data-layer-id', uuid);
      this.item.push(uuid);

      const body = document.querySelector('body');
      body.classList.add('layer--hold');
      clearTimeout(timeout);
      timeout = setTimeout(function(){
        body.classList.add('layer--activate');
      },10);
    },
    remove: function (el) {
      let key = el.getAttribute('data-layer-id') || 0;
      const index = this.item.indexOf(key);
      if (index > -1) {
        this.item.splice(index, 1);
        if (!this.item.length) {
          clearTimeout(timeout);
          el.removeAttribute('data-layer-id');

          const body = document.querySelector('body');
          body.classList.remove('layer--activate');
          timeout = setTimeout(function(){
            body.classList.remove('layer--hold');
          },1000);
        }
      }
    },
  };

  document.documentElement.addEventListener('touchmove', (e) => {
    if(document.querySelector('body').classList.contains('layer--activate')){
      e.preventDefault();
    }
  }, false);
});