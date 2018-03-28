define(['./core'], (Codenut) => {
  'use strict';
  const offset = function (el) {
    let x = 0;
    let y = 0;
    while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
      x += el.offsetLeft - el.scrollLeft;
      y += el.offsetTop - el.scrollTop;
      el = el.offsetParent;
    }
    return {top: y, left: x};
  };

  const scroll = function (evt) {
    const el = document.querySelectorAll('.scrollspy');
    if (el.length) {
      let y = document.documentElement.scrollTop || window.pageYOffset || 0;
      for (let i = 0, len = el.length; i < len; i++) {
        let top = offset(el[i]).top - window.innerHeight;
        if (!document.documentElement.scrollTop) {
          top = (offset(el[i]).top + window.pageYOffset) - window.innerHeight;
        }
        const max = top + el[i].offsetHeight + window.innerHeight;
        if (y > top && y < max) {
          el[i].classList.add('scrollspy--activate');
        } else {
          el[i].classList.remove('scrollspy--activate');
        }
      }
    } else {
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('resize', scroll);
    }
    document.removeEventListener('ContentLoaded', scroll);
  };

  window.addEventListener('scroll', scroll);
  window.addEventListener('resize', scroll);
  document.addEventListener('ContentLoaded', scroll);
});