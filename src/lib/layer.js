define( ['./core'], (Codenut) => {
  'use strict';
  Codenut.layer = {
    item:[],
    add: function (key) {
      this.item.push(key);
      document.querySelector('body').classList.add('open--layer');
    },
    remove: function (key) {
      const index = this.item.indexOf(key);
      if( index > -1){
        this.item.splice(index, 1);
        if( !this.item.length ){
          document.querySelector('body').classList.remove('open--layer');
        }
      }
    },
  };
});