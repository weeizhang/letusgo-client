'use strict';

xdescribe('Controller: ListCtrl', function () {

  var $scope, itemService, cartService, createController;

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

    createController();

  });

  it('should emit to parent controller when come in list', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-inlist');
  });

  it('should return all items to items', function () {
    spyOn(itemService, 'loadAllItems');
    createController();
    var result = itemService.loadAllItems();
    expect($scope.items).toEqual(result);
  });

  it('should call addCartItem in cartService', function () {
    spyOn(cartService, 'addCartItem');
    var item = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    $scope.addCartItem(item);
    expect(cartService.addCartItem).toHaveBeenCalledWith(item);
  });

  it('should emit to parent controller when add cart item', function () {
    spyOn($scope, '$emit');
    spyOn(cartService, 'addCartItem');
    var item = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    $scope.addCartItem(item);
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-changeamounts');
  });

});
