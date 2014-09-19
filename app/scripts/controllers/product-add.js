'use strict';

angular.module('letusgoApp')
  .controller('ProductAddCtrl', function ($scope, $location, ProductService, CategoryService) {

    function addProduct(callback) {
      var id = +$scope.products[$scope.products.length - 1].barcode.substring(9);
      $scope.addproduct.barcode = $scope.products[$scope.products.length - 1].barcode.substring(0, 9) + (id + 1);
      ProductService.addProductInfo($scope.addproduct, function(data) {
        callback(data);
      });
    }

    $scope.$emit('to-parent-manage');

    $scope.addproduct = {};
    $scope.tip = '';

    CategoryService.getAllCategoryInfo(function(data) {
      $scope.categorys = data;
    });

    ProductService.getAllProductInfo(function(data) {
      $scope.products = data;
    });

    $scope.addProductInfo = function () {
      var isEmpty = $scope.addproduct.name && $scope.addproduct.category && $scope.addproduct.price && $scope.addproduct.unit;
      if (isEmpty) {
        addProduct(function(data) {
          $scope.products = data;
          $location.path('/product');
        });
      } else {
        $scope.tip = '输入项不能为空！';
      }
    };

  });
