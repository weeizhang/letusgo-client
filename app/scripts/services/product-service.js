'use strict';

angular.module('letusgoApp')
  .service('ProductService', function ($http) {

    function getItems(callback) {
      $http.get('/items')
        .success(function (data) {
          callback(data);
        });
    }

    function getItemById(id, callback) {
      $http.get('/items/' + id)
        .success(function (data) {
          callback(data);
        });
    }

    function addItem(item, callback) {
      $http.post('/items', {'item': item})
        .success(function (data) {
          callback(data);
        });
    }

    function updateItem(item, callback) {
      var id = item.id;
      $http.put('/items/'+id , {'item': item})
        .success(function (data) {
          callback(data);
        });
    }

    function removeItem(item, callback) {
      var id = item.id;
      $http.delete('/items/'+id)
        .success(function (data) {
          callback(data);
        });
    }

    this.loadAllItems = function (callback) {
      $http.get('/items')
        .success(function (data) {
          callback(data);
        });
    };

    this.getAllProductInfo = function (callback) {
      getItems(function (data) {
        callback(data);
      });
    };

    this.getProductInfoById = function (id, callback) {
      getItemById(id, function (data) {
        callback(data);
      });
    };

    this.addProductInfo = function (productInfo, callback) {
      addItem(productInfo, function (data) {
        callback(data);
      });
    };

    this.removeProductInfo = function (productInfo, callback) {
      removeItem(productInfo, function(data) {
        callback(data);
      });
    };

    this.updateProductInfo = function (productInfo, callback) {
      updateItem(productInfo, function(data) {
        callback(data);
      });
    };

  });


