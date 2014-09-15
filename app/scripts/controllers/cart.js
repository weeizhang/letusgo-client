'use strict';

angular.module('letusgoApp')
  .controller('CartCtrl', function ($scope, cartService) {

    function emit(name) {
      $scope.$emit(name);
    }

    function updateData(cartItemList) {
      $scope.cartItemGroup = cartService.categoryCartItem(cartItemList);
      $scope.total = cartService.totalPrice(cartItemList);
    }

    emit('to-parent-incart');

    var cartItemList = cartService.getCartItem();

    updateData(cartItemList);

    $scope.addCartItemClick = function (cartItem) {

      cartItemList = cartService.addCartItem(cartItem.item);

      updateData(cartItemList);

      emit('to-parent-changeamounts');
    };

    $scope.reduceCartItemClick = function (cartItem) {

      cartItemList = cartService.reduceCartItem(cartItem.item);

      updateData(cartItemList);

      emit('to-parent-changeamounts');
    };

    $scope.isShow = function () {
      cartItemList = cartService.getCartItem();
      return !(cartItemList === null || cartItemList.length === 0);
    };

  });
