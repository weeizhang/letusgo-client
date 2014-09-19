'use strict';

angular.module('letusgoApp')
  .controller('ProductCtrl', function ($scope, $location, ProductService, CategoryService) {

    $scope.$emit('to-parent-manage');

    $scope.categorys = [];
    CategoryService.getAllCategoryInfo(function(data) {
      $scope.categorys = data;
    });

    $scope.products = [];
    ProductService.getAllProductInfo(function(data) {
      $scope.products = data;
    });


    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;

    $scope.pageCount = function () {
      var maxPage = Math.ceil($scope.products.length / $scope.itemsPerPage);
      return maxPage;
    };

    $scope.range = function () {
      var pages = [];
      var maxPage = $scope.pageCount();
      for (var i = 1; i <= maxPage; i++) {
        pages.push(i);
      }
      return pages;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 1) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 1 ? true : false;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? true : false;
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };


    $scope.removeProductInfo = function (productInfo) {
      ProductService.removeProductInfo(productInfo, function(data) {
        $scope.products = data;
      });
    };

    $scope.update = function (productInfo) {
      $scope.updateproduct = productInfo;
    };

    $scope.updateProductClick = function (productInfo) {
      $location.path('/product-update');
      $location.search({'barcode': productInfo.barcode});
    };

    $scope.addProductClick = function () {
      $location.path('/product-add');
    };

  });
