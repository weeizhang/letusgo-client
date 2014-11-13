'use strict';

describe('Service: cartService', function () {
  var cartService, $httpBackend, localStorageService, cartItemList;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      cartService = $injector.get('CartService');
      $httpBackend = $injector.get('$httpBackend');
      localStorageService = $injector.get('localStorageService');
    });

    cartItemList = [
      {item: {id:1, 'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1},
      {item: {id:2, 'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 3},
      {item: {id:3, 'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'}, num: 2}
    ];
  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should return the cartItemList', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    expect(cartService.getCartItems().length).toBe(3);
  });

  it('should return the amount when amount is not undefined', function () {
    spyOn(localStorageService, 'get').and.returnValue(6);
    var result = cartService.getAmount();
    expect(result).toBe(6);
  });

  it('should call local storage set function when amount is null', function () {
    spyOn(localStorageService, 'get').and.returnValue(null);
    spyOn(localStorageService, 'set');
    cartService.getAmount();
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should category the cart item list', function () {
    var result = cartService.categoryCartItem(cartItemList);
    expect(result.length).toBe(2);
  });

  it('called local storage service set and get function 2 times when add cart item', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    spyOn(localStorageService, 'set');
    var item = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};

    cartService.addCartItem(item);

    expect(localStorageService.get.calls.count()).toEqual(2);
    expect(localStorageService.set.calls.count()).toEqual(2);
  });

  it('called local storage service set and get function 2 times when reduce cart item', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    spyOn(localStorageService, 'set');
    var item = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};

    cartService.reduceCartItem(item);

    expect(localStorageService.get.calls.count()).toEqual(2);
    expect(localStorageService.set.calls.count()).toEqual(2);
  });

  it('should return the total price', function () {
    var result = cartService.totalPrice(cartItemList);
    expect(result).toBe(42);
  });

});
