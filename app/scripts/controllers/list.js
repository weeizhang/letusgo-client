'use strict';

angular.module('letusgoApp')
  .controller('ListCtrl', function ($scope, CartService, ProductService) {

    $scope.$emit('to-parent-inlist');

    ProductService.loadAllItems(function (data) {
      $scope.items = data;
    });

    $scope.addCartItem = function (item) {
      CartService.addCartItem(item);
      $scope.$emit('to-parent-changeamounts');
    };
  });
