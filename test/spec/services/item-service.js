'use strict';

describe('Service: itemService', function () {
  var itemService, localStorageService,items;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      itemService = $injector.get('itemService');
      localStorageService = $injector.get('localStorageService');
    });
    var item1 = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item2 = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item3 = {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'};
    var item4 = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    var item5 = {'barcode': 'ITEM000004', 'name': '电池', 'unit': '个', 'price': 2.00, 'category': '生活用品'};
    var item6 = {'barcode': 'ITEM000005', 'name': '方便面', 'unit': '袋', 'price': 4.50, 'category': '食品'};
    items = [item1, item2, item3, item4, item5, item6];
  });

  it('should return items', function () {

    spyOn(localStorageService, 'set');
    spyOn(localStorageService, 'get').and.returnValue(items);
    var result = itemService.loadAllItems();

    expect(result.length).toBe(6);
    expect(result[0].barcode).toBe('ITEM000000');
    expect(result[3].barcode).toBe('ITEM000003');
    expect(result[5].barcode).toBe('ITEM000005');
  });

});
