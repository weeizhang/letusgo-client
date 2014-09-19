'use strict';

angular.module('letusgoApp')
  .controller('ListCtrl', function ($scope, $http, ItemService, CartService) {

    $scope.$emit('to-parent-inlist');

    ItemService.loadAllItems(function(data){
      $scope.items = data;
    });

    $scope.addCartItem = function (item) {
      CartService.addCartItem(item);
      $scope.$emit('to-parent-changeamounts');
    };
  });
