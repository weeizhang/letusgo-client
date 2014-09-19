'use strict';

angular.module('letusgoApp')
  .controller('ProductUpdateCtrl', function ($scope, $location, ProductService, CategoryService) {

    $scope.$emit('to-parent-manage');

    var barcode = $location.search().barcode;
    ProductService.getProductInfoById(barcode, function(data) {
      $scope.updateproduct = data;
    });

    CategoryService.getAllCategoryInfo(function(data) {
      $scope.categorys = data;
    });

    $scope.updateProductInfo = function () {
      ProductService.updateProductInfo($scope.updateproduct, function() {
        $location.path('/product');
      });
    };

  });
