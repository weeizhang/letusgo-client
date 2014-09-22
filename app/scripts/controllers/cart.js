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

    CartService.getCartItem(function (data) {

      updateData(data);

      $scope.isShow = !(data === null || data.length === 0);

    });


    $scope.addCartItemClick = function (cartItem) {
      CartService.addCartItem(cartItem.item, function (data) {
        emit('to-parent-changeamounts');
        updateData(data);
      });
    };

    $scope.reduceCartItemClick = function (cartItem) {

      CartService.reduceCartItem(cartItem.item, function (data) {
        if (data === 'OK') {
          emit('to-parent-changeamounts');
          CartService.getCartItem(function (data) {
            updateData(data);
            $scope.isShow = !(data === null || data.length === 0);
          });
        }
      });

    };
  });
