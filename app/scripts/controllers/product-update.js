'use strict';

angular.module('letusgoApp')
  .controller('ProductUpdateCtrl', function ($scope, $location, ProductService, CategoryService) {

    $scope.$emit('to-parent-manage');

    var id = $location.search().id;
    ProductService.getProductInfoById(id, function(data) {
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
