define( ['./core'], (Codenut) => {
  'use strict';
  Codenut.layer = {
    item:[],
    add: function (el) {
      const uuid = Codenut.util.uuid();
      el.setAttribute('data-layer-id', uuid);
      this.item.push(uuid);
      document.querySelector('body').classList.add('layer--open');
      if( !document.getElementById('layer__backdrop') ){
        const backdrop = document.createElement('div');
        backdrop.id = 'layer__backdrop';
        document.getElementsByTagName('body')[0].appendChild(backdrop);
        TweenMax.to(backdrop, .5, {opacity:.4, ease:Expo.easeOut});
      }
    },
    remove: function (el) {
      let key = el.getAttribute('data-layer-id') || 0;
      const index = this.item.indexOf(key);
      if( index > -1){
        this.item.splice(index, 1);
        if( !this.item.length ){
          const backdrop = document.getElementById('layer__backdrop');
          TweenMax.killTweensOf(backdrop);
          TweenMax.to(backdrop, .5, {opacity:0, ease:Expo.easeOut, onComplete:()=>{
            document.querySelector('body').classList.remove('layer--open');
            backdrop.parentNode.removeChild(backdrop);
          }});
        }
      }
    },
  };
});