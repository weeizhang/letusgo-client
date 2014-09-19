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
      
    };

    this.getProductInfoById = function (barcode) {
      var products = localStorageService.get('items');
      return _.find(products, {'id': barcode});
    };

    this.addProductInfo = function (productInfo) {
      var productList = localStorageService.get('items');
      productList.push(productInfo);
      localStorageService.set('items', productList);
      return productList;
    };

    this.removeProductInfo = function (productInfo) {
      var productList = localStorageService.get('items');
      var index = _.findIndex(productList, {'barcode': productInfo.barcode});
      productList.splice(index, 1);
      localStorageService.set('items', productList);
      return productList;
    };

    this.updateProductInfo = function (productInfo) {
      var productList = localStorageService.get('items');
      var index = _.findIndex(productList, {'barcode': productInfo.barcode});
      productList[index] = productInfo;
      localStorageService.set('items', productList);
      return productList;
    };

  });


