'use strict';

describe('Controller: ProductAddCtrl', function () {

  var $scope, productService, createController, productList;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('ProductService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ProductAddCtrl', {
          $scope: $scope,
          ProductService: productService
        });
      };
    });

    productList = [
      {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'}
    ];

  });

  it('should emit to parent controller when come in ProductAddCtrl', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-manage');
  });

  it('should add product info into product list', function () {
    spyOn(productService, 'getAllProductInfo').and.returnValue(productList);
    var product = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    productList.push(product);
    spyOn(productService, 'addProductInfo').and.returnValue(productList);
    createController();
    $scope.addproduct = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    $scope.addProductInfo();
    expect(productService.addProductInfo).toHaveBeenCalled();
  });

});
