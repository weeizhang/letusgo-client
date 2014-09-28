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
    $httpBackend.expectGET('/api/cartItems').respond(200, cartItemList);
    cartService.getCartItem(function (data) {
      expect(data.length).toBe(3);
    });
    $httpBackend.flush();
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

  it('should called the set function when set amount', function () {
    spyOn(localStorageService, 'set');
    cartService.setAmount(7);
    expect(localStorageService.set).toHaveBeenCalled();
  });

  it('should category the cart item list', function () {
    var result = cartService.categoryCartItem(cartItemList);
    expect(result.length).toBe(2);
  });

  it('should add cart item into cart item list', function () {
    var item = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    cartItemList[1].num = 4;
    $httpBackend.expectPOST('/api/cartItems', {cartItem: item}).respond(200, cartItemList);
    cartService.addCartItem(item, function (data) {
      expect(data[1].num).toBe(4);
    });
    $httpBackend.flush();
  });

  it('should reduce cart item from cart item list', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    spyOn(localStorageService, 'set');

    var item1 = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item2 = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};

    var cartItemList1 = cartService.reduceCartItem(item1);
    expect(cartItemList1[1].num).toBe(2);

    var cartItemList2 = cartService.reduceCartItem(item2);
    expect(cartItemList2.length).toBe(2);
    expect(cartItemList2[0].item.barcode).toEqual('ITEM000001');
    expect(cartItemList2[1].item.barcode).toEqual('ITEM000003');
  });

  it('should return the total price', function () {

    var result = cartService.totalPrice(cartItemList);

    expect(result).toBe(42);
  });

});
