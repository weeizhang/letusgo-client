'use strict';

angular.module('letusgoApp')
  .controller('ListCtrl', function ($scope, ItemService, CartService) {

    $scope.$emit('to-parent-inlist');

    $scope.items = ItemService.loadAllItems();

    $scope.addCartItem = function (item) {
      CartService.addCartItem(item);
      $scope.$emit('to-parent-changeamounts');
    };
  });
