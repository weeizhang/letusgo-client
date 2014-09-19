'use strict';

angular.module('letusgoApp')
  .service('ItemService', function ($http,$q) {

    this.loadAllItems = function(callback){
      $http.get('/api/items')
        .success(function (data) {
          callback(data);
        });
    };

  });

