'use strict';

angular.module('letusgoApp')
  .controller('InventoryCtrl', function ($scope, CartService) {

    $scope.curdate = moment(new Date()).format('YYYY年MM月DD日 HH:mm:ss');
    $scope.cartItemList = CartService.getCartItems();

    $scope.inventorytotal = CartService.totalPrice($scope.cartItemList);

    $scope.okPayClick = function () {
      $scope.$emit('to-parent-changeamounts');
      CartService.cleanCart();
      alert('支付成功！');
    };

  });
