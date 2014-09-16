'use strict';

angular.module('letusgoApp')
  .controller('InventoryCtrl', function ($scope, CartService) {

    $scope.curdate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
    $scope.cartItemList = CartService.getCartItem();

    $scope.inventorytotal = CartService.totalPrice($scope.cartItemList);

    $scope.okPayClick = function () {
      CartService.cleanCart();
      $scope.$emit('to-parent-changeamounts');
    };

  });
