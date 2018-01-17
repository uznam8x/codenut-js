'use strict';
module.exports = () => {
  'use strict';
  Codenut.request = () => {
    const query = {};
    window.location.search.replace(
      new RegExp('([^?=&]+)(=([^&]*))?', 'g'), ($0, $1, $2, $3) => {
        query[$1] = $3;
      }
    );
    return query;
  }
};