'use strict';

describe('Controller: InventoryCtrl', function () {

  var $scope, cartService, createController, cartItems;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      cartService = $injector.get('CartService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('InventoryCtrl', {
          $scope: $scope,
          CartService: cartService
        });
      };
    });

    var cartItem1 = {"item":{"id":1,"barcode":"ITEM000000","name":"可口可乐","unit":"瓶","price":3,"category":"饮料"},"num":2};
    var cartItem2 = {"item":{"id":2,"barcode":"ITEM000001","name":"雪碧","unit":"瓶","price":3,"category":"饮料"},"num":1};
    var cartItem3 = {"item":{"id":3,"barcode":"ITEM000002","name":"苹果","unit":"斤","price":5.5,"category":"水果"},"num":1};
    cartItems = [cartItem1, cartItem2, cartItem3];

  });

  it('should call getCartItem in cartService and return to cartItemList', function () {
    spyOn(cartService, 'getCartItem').and.callFake(function (callback) {
      callback(cartItems);
    });
    createController();
    cartService.getCartItem(function (cartItems) {
      expect($scope.cartItemList).toEqual(cartItems);
    });
  });

  it('should call totalPrice in cartService and return to totalPrice', function () {
    spyOn(cartService, 'totalPrice');
    createController();
    var totalPrice = cartService.totalPrice($scope.cartItemList);
    expect($scope.totalPrice).toEqual(totalPrice);
  });

  it('should call cleanCart in cartService when click pay button', function () {
    spyOn(cartService, 'cleanCart');
    spyOn($scope, '$emit');
    createController();
    $scope.okPayClick();
    expect(cartService.cleanCart).toHaveBeenCalled();
  });

  it('should pay success', function () {
    spyOn(cartService, 'cleanCart').and.callFake(function (callback) {
      callback('OK');
    });
    spyOn($scope, '$emit');
    spyOn(window, 'alert');
    createController();
    $scope.okPayClick();
    expect(window.alert).toHaveBeenCalled();
  });

  it('should pay failure', function () {
    spyOn(cartService, 'cleanCart').and.callFake(function (callback) {
      callback('ERR');
    });
    spyOn($scope, '$emit');
    spyOn(window, 'alert');
    createController();
    $scope.okPayClick();
    expect(window.alert).not.toHaveBeenCalled();
  });

  it('should emit to parent controller when click pay button', function () {
    spyOn($scope, '$emit');
    createController();
    $scope.okPayClick();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
  });

});
