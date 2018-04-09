define( [], () => {
  'use strict';
  window.Codenut = window.Codenut || {};
  window.Codenut.version = '1.0.16';
  window.Codenut.website = 'http://codenut.prisf.com';
  window.Codenut.mail = 'uznam8x@gmail.com';

  // Disable # link
  document.addEventListener('click', (e) => {
    let a = ( e.target.nodeName.toLowerCase() === 'a') ? e.target : e.target.closest('a');
    if( a ){
      const HREF = a.getAttribute('href');
      if(HREF === '#'){
        e.preventDefault();
      }
    }
  });
  return window.Codenut;
});
