'use strict';

angular.module('letusgoApp')
  .controller('ProductUpdateCtrl', function ($scope, $location, ProductService, CategoryService) {

    $scope.$emit('to-parent-manage');

    var id = $location.search().id;
    $scope.updateproduct = ProductService.getProductInfoById(id);

    $scope.categorys = CategoryService.getAllCategoryInfo();

    $scope.updateProductInfo = function () {
      ProductService.updateProductInfo($scope.updateproduct);
      $location.path('/product');
    };

  });
