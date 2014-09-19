'use strict';

angular.module('letusgoApp')
  .service('ProductService', function (localStorageService, $http) {

    function getItems(callback) {
      $http.get('/api/items')
        .success(function (data) {
          callback(data);
        });
    }

    function setItems(items, callback) {
      $http({method: 'POST', url: '/api/items', params: {'items': JSON.stringify(items)}})
        .success(function (data) {
          callback(data);
        });
    }

    this.getAllProductInfo = function (callback) {
      getItems(function (data) {
        callback(data);
      });
    };

    this.getProductInfoById = function (barcode, callback) {
      getItems(function (data) {
        var product = _.find(data, {'barcode': barcode});
        callback(product);
      });
    };

    this.addProductInfo = function (productInfo, callback) {
      getItems(function (data) {
        var productList = data;
        productList.push(productInfo);
        setItems(productList, function(data1) {
          if(data1 === 'OK'){
            callback(productList);
          }
        })
      });
    };

    this.removeProductInfo = function (productInfo, callback) {
      getItems(function(data) {
        var productList = data;
        var index = _.findIndex(productList, {'barcode': productInfo.barcode});
        productList.splice(index, 1);
        setItems(productList, function(data1) {
          if(data1 === 'OK'){
            callback(productList);
          }
        })
      });
    };

    this.updateProductInfo = function (productInfo, callback) {
      getItems(function(data) {
        var productList = data;
        var index = _.findIndex(productList, {'barcode': productInfo.barcode});
        productList[index] = productInfo;
        setItems(productList, function(data1) {
          if(data1 === 'OK'){
            callback();
          }
        })
      });
    };

  });


