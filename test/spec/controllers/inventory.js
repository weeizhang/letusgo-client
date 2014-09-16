'use strict';

describe('Controller: InventoryCtrl', function () {

  var $scope, cartService, createController;

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

    createController();

  });

  it('should call getCartItem in cartService and return to cartItemList', function () {
    spyOn(cartService, 'getCartItem');
    createController();
    var cartItems = cartService.getCartItem();
    expect($scope.cartItemList).toEqual(cartItems);
  });

  it('should call totalPrice in cartService and return to totalPrice', function () {
    spyOn(cartService, 'totalPrice');
    var totalPrice = cartService.totalPrice($scope.cartItemList);
    expect($scope.totalPrice).toEqual(totalPrice);
  });

  it('should call cleanCart in cartService when click pay button', function () {
    spyOn(cartService, 'cleanCart');
    spyOn($scope, '$emit');
    $scope.okPayClick();
    expect(cartService.cleanCart).toHaveBeenCalled();
  });

  it('should emit to parent controller when click pay button', function () {
    spyOn($scope, '$emit');
    $scope.okPayClick();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
  });
});
