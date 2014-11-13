'use strict';

angular.module('letusgoApp')
  .filter('pageitems', function () {
    return function (input, start) {
      return input.slice(parseInt(start));
    };
  });
