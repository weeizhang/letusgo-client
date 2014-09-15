'use strict';

angular.module('letusgoApp')
  .controller('ProductAddCtrl', function ($scope, $location, productService, categoryService) {

    function addProduct() {
      var id = +$scope.products[$scope.products.length - 1].barcode.substring(9);
      $scope.addproduct.barcode = $scope.products[$scope.products.length - 1].barcode.substring(0, 9) + (id + 1);
      $scope.products = productService.addProductInfo($scope.addproduct);
    }

    $scope.$emit('to-parent-manage');

    $scope.addproduct = {};
    $scope.tip = '';

    $scope.categorys = categoryService.getAllCategoryInfo();

    $scope.products = productService.getAllProductInfo();

    $scope.addProductInfo = function () {
      var isEmpty = $scope.addproduct.name && $scope.addproduct.category && $scope.addproduct.price && $scope.addproduct.unit;
      if (isEmpty) {
        addProduct();
        $location.path('/product');
      } else {
        $scope.tip = '输入项不能为空！';
      }
    };

  });
