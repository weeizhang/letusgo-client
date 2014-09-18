'use strict';

angular.module('letusgoApp')
  .service('ItemService', function ($http,$q) {

    this.loadAllItems = function () {
      var deferred = $q.defer();
      $http.get('/api/items')
        .success(function (data) {
          deferred.resolve(data);
        });
      return deferred.promise;
    };

  });

