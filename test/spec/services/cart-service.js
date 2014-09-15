'use strict';

describe('Service: cartService', function () {
  var cartService, localStorageService, cartItemList;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      cartService = $injector.get('cartService');
      localStorageService = $injector.get('localStorageService');
    });

    cartItemList = [
      {item: {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 1},
      {item: {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}, num: 3},
      {item: {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'}, num: 2}
    ];
  });

  it('should return the cartItemList', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    var result = cartService.getCartItem();

    expect(result).toEqual(cartItemList);
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

  it('should called the set function', function () {
    spyOn(localStorageService, 'set');
    cartService.setAmount(7);

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

  it('should add cart item into cart item list', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    spyOn(localStorageService, 'set');

    var item1 = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item2 = {'barcode': 'ITEM000005', 'name': '方便面', 'unit': '袋', 'price': 4.50, 'category': '食品'};

    var cartItemList1 = cartService.addCartItem(item1);
    expect(cartItemList1[1].num).toBe(4);

    var cartItemList2 = cartService.addCartItem(item2);
    expect(cartItemList2[3].num).toBe(1);
  });

  it('called local storage service set and get function 2 times when reduce cart item', function () {
    spyOn(localStorageService, 'get').and.returnValue(cartItemList);
    spyOn(localStorageService, 'set');
    var item = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};

    cartService.reduceCartItem(item);

    expect(localStorageService.get.calls.count()).toEqual(2);
    expect(localStorageService.set.calls.count()).toEqual(2);
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

  it('called local storage service set and get function 1 times when click pay ok button', function () {
    spyOn(localStorageService, 'remove');
    spyOn(localStorageService, 'set');

    cartService.cleanCart();

    expect(localStorageService.remove.calls.count()).toEqual(1);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

});
