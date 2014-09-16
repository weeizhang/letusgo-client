'use strict';

angular.module('letusgoApp')
  .controller('CartCtrl', function ($scope, CartService) {

    function emit(name) {
      $scope.$emit(name);
    }

    function updateData(cartItemList) {
      $scope.cartItemGroup = CartService.categoryCartItem(cartItemList);
      $scope.total = CartService.totalPrice(cartItemList);
    }

    emit('to-parent-incart');

    var cartItemList = CartService.getCartItem();

    updateData(cartItemList);

    $scope.addCartItemClick = function (cartItem) {

      cartItemList = CartService.addCartItem(cartItem.item);

      updateData(cartItemList);

      emit('to-parent-changeamounts');
    };

    $scope.reduceCartItemClick = function (cartItem) {

      cartItemList = CartService.reduceCartItem(cartItem.item);

      updateData(cartItemList);

      emit('to-parent-changeamounts');
    };

    $scope.isShow = function () {
      cartItemList = CartService.getCartItem();
      return !(cartItemList === null || cartItemList.length === 0);
    };

  });
