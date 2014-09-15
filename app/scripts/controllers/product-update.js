'use strict';

angular.module('letusgoApp')
  .controller('ProductUpdateCtrl', function ($scope, $location, productService, categoryService) {

    $scope.$emit('to-parent-manage');

    var id = $location.search().id;
    $scope.updateproduct = productService.getProductInfoById(id);

    $scope.categorys = categoryService.getAllCategoryInfo();

    $scope.updateProductInfo = function () {
      productService.updateProductInfo($scope.updateproduct);
      $location.path('/product');
    };

  });
