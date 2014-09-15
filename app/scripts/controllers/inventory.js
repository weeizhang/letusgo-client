'use strict';

angular.module('letusgoApp')
  .controller('InventoryCtrl', function ($scope, cartService) {

    $scope.curdate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
    $scope.cartItemList = cartService.getCartItem();

    $scope.inventorytotal = cartService.totalPrice($scope.cartItemList);

    $scope.okPayClick = function () {
      cartService.cleanCart();
      $scope.$emit('to-parent-changeamounts');
    };

  });
