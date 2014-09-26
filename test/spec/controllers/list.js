'use strict';

describe('Controller: ListCtrl', function () {

  var $scope, itemService, cartService, createController, items;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      itemService = $injector.get('ItemService');
      cartService = $injector.get('CartService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ListCtrl', {
          $scope: $scope,
          ItemService: itemService,
          CartService: cartService
        });
      };
    });

    var item1 = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item2 = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item3 = {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'};
    var item4 = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    var item5 = {'barcode': 'ITEM000004', 'name': '电池', 'unit': '个', 'price': 2.00, 'category': '生活用品'};
    var item6 = {'barcode': 'ITEM000005', 'name': '方便面', 'unit': '袋', 'price': 4.50, 'category': '食品'};
    items = [item1, item2, item3, item4, item5, item6];

  });

  it('should emit to parent controller when come in list', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-inlist');
  });

  it('should return all items to items', function () {
    spyOn(itemService, 'loadAllItems').and.callFake(function (callback) {
      callback(items);
    });
    createController();
    itemService.loadAllItems(function (data) {
      expect($scope.items).toEqual(data);
    });
  });

  it('should call addCartItem in cartService', function () {
    spyOn(cartService, 'addCartItem');
    createController();
    var item = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    $scope.addCartItem(item);
    expect(cartService.addCartItem).toHaveBeenCalled();
  });

});
