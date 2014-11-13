'use strict';

angular.module('letusgoApp')
  .controller('CartCtrl', function ($scope, CartService) {

    function emit(name) {
      $scope.$emit(name);
    }

    function updateData() {
      var cartItemList = CartService.getCartItems();
      $scope.cartItemGroup = CartService.categoryCartItem(cartItemList);
      $scope.total = CartService.totalPrice(cartItemList);
      $scope.isShow = !(cartItemList === null || cartItemList.length === 0);
    }

    emit('to-parent-incart');

    updateData();

    $scope.addCartItemClick = function (cartItem) {
      CartService.addCartItem(cartItem.item);
      emit('to-parent-changeamounts');
      updateData();
    };

    $scope.reduceCartItemClick = function (cartItem) {
      CartService.reduceCartItem(cartItem.item);
      emit('to-parent-changeamounts');
      updateData();
    };
  });
