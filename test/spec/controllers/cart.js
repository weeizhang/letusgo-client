'use strict';

describe('Controller: CartCtrl', function () {

  var $scope, cartService, createController, cartItems;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      cartService = $injector.get('CartService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CartCtrl', {
          $scope: $scope,
          CartService: cartService
        });
      };
    });

    cartItems = [
      {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1},
      {item: {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 3},
      {item: {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'}, num: 2}
    ];

  });

  it('should emit to parent controller when come in cart', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-incart');
  });

  it('should call getCartItem in cartService', function () {
    spyOn(cartService, 'getCartItem').and.returnValue(cartItems);
    createController();
    expect(cartService.getCartItem).toHaveBeenCalled();
  });

  it('should call categoryCartItem in cartService', function () {
    spyOn(cartService, 'categoryCartItem');
    createController();
    expect(cartService.categoryCartItem).toHaveBeenCalled();
  });

  it('should call totalPrice in cartService', function () {
    spyOn(cartService, 'totalPrice');
    createController();
    expect(cartService.totalPrice).toHaveBeenCalled();
  });

  describe('when click add cart item', function () {

    it('should call addCartItem in cartService', function () {
      spyOn(cartService, 'addCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem);
      expect(cartService.addCartItem).toHaveBeenCalled();
    });

    it('should call categoryCartItem in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'addCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem);
      expect(cartService.categoryCartItem).toHaveBeenCalled();
    });

    it('should call totalPrice in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'addCartItem');
      spyOn(cartService, 'totalPrice');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem);
      expect(cartService.totalPrice).toHaveBeenCalled();
    });

    it('should emit to parent controller when add cart item', function () {
      spyOn($scope, '$emit');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.addCartItemClick(cartItem);
      expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
    });

  });

  describe('when click reduce cart item', function () {

    it('should call reduceCartItem in cartService', function () {
      spyOn(cartService, 'reduceCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem);
      expect(cartService.reduceCartItem).toHaveBeenCalled();
    });

    it('should call categoryCartItem in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'reduceCartItem');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem);
      expect(cartService.categoryCartItem).toHaveBeenCalled();
    });

    it('should call totalPrice in cartService', function () {
      spyOn(cartService, 'categoryCartItem');
      spyOn(cartService, 'reduceCartItem');
      spyOn(cartService, 'totalPrice');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem);
      expect(cartService.totalPrice).toHaveBeenCalled();
    });

    it('should emit to parent controller when add cart item', function () {
      spyOn($scope, '$emit');
      createController();
      var cartItem = {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1};
      $scope.reduceCartItemClick(cartItem);
      expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
    });

  });

  describe('which button display', function () {

    it('should return true when have cart items', function () {
      spyOn(cartService, 'getCartItem').and.returnValue(cartItems);
      createController();
      expect($scope.isShow()).toBe(true);
      expect(cartService.getCartItem).toHaveBeenCalled();
    });

    it('should return false when have cart items', function () {
      var cartItemList = [];
      spyOn(cartService, 'getCartItem').and.returnValue(cartItemList);
      createController();
      expect($scope.isShow()).toBe(false);
      expect(cartService.getCartItem).toHaveBeenCalled();
    });

  });

});
