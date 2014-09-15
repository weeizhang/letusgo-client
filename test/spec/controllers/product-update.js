'use strict';

describe('Controller: ProductUpdateCtrl', function () {

  var $scope, productService, createController, productList;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      productService = $injector.get('productService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ProductUpdateCtrl', {
          $scope: $scope,
          productService: productService
        });
      };
    });

    productList = [
      {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'}
    ];

  });

  it('should emit to parent controller when come in ProductUpdateCtrl', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-manage');
  });

  it('should update product info into product list', function () {
    spyOn(productService, 'getAllProductInfo').and.returnValue(productList);
    productList[1] = {'barcode': 'ITEM000001', 'name': '果粒橙', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    spyOn(productService, 'updateProductInfo').and.returnValue(productList);
    createController();
    $scope.updateProductInfo();
    expect(productService.updateProductInfo).toHaveBeenCalled();
  });

});
