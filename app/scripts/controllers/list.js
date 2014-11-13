'use strict';

angular.module('letusgoApp')
  .controller('ListCtrl', function ($scope, CartService) {

    $scope.$emit('to-parent-inlist');

    CartService.loadAllItems(function (data) {
      $scope.items = data;
    });

    $scope.addCartItem = function (item) {
      CartService.addCartItem(item, function () {
        $scope.$emit('to-parent-changeamounts');
      });
    };
  });
