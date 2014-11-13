'use strict';

angular.module('letusgoApp')
  .service('ItemService', function ($http) {

    this.loadAllItems = function (callback) {
      $http.get('/items')
        .success(function (data) {
          callback(data);
        });
    };

  });
