'use strict';

angular.module('letusgoApp')
  .service('productService', function (localStorageService) {

    this.getAllProductInfo = function () {
      return localStorageService.get('items');
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


