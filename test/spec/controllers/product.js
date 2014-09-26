'use strict';

describe('Controller: ProductCtrl', function () {

  var $scope, $location, productService, createController, productList;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      productService = $injector.get('ProductService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('ProductCtrl', {
          $scope: $scope,
          $location: $location,
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

  it('should emit to parent controller when come in product manage', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-manage');
  });

  it('should load all product info list', function () {
    spyOn(productService, 'getAllProductInfo').and.callFake(function (callback) {
      callback(productList);
    });
    createController();
    expect($scope.products).toEqual(productList);
  });

  it('should remove product info into product list', function () {
    spyOn(productService, 'getAllProductInfo').and.returnValue(productList);
    productList.splice(1, 1);
    spyOn(productService, 'removeProductInfo').and.returnValue(productList);
    createController();
    var product = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    $scope.removeProductInfo(product, function() {
      expect(productService.removeProductInfo).toHaveBeenCalledWith(product);
      expect($scope.products.length).toEqual(2);
    });
  });

  it('should come into product add when click add product', function () {
    createController();
    $scope.addProductClick();
    expect($location.path() === '/product-add').toBe(true);
  });

  it('should come into product update when click update product', function () {
    createController();
    var product = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    $scope.updateProductClick(product);
    expect($location.path() === '/product-update').toBe(true);
  });

  it('should return page count', function(){
    spyOn(productService, 'getAllProductInfo').and.returnValue(productList);
    createController();
    var pagecount = $scope.pageCount();
    expect(pagecount).toBe(0);
  });

  it('should return page range',function() {
    createController();
    spyOn($scope, 'pageCount').and.returnValue(2);
    var range = $scope.range();
    expect(range).toEqual([1,2]);
  });

  it('should change current page when click previous',function() {
    createController();
    $scope.currentPage = 2;
    $scope.prevPage();
    expect($scope.currentPage).toBe(1);

    $scope.currentPage = 1;
    $scope.prevPage();
    expect($scope.currentPage).toBe(1);
  });

  it('should return true when current page is 1',function() {
    createController();
    $scope.currentPage = 1;
    expect($scope.prevPageDisabled()).toBe(true);

    $scope.currentPage = 2;
    expect($scope.prevPageDisabled()).toBe(false);
  });

  it('should return true when current page is max',function() {
    createController();
    spyOn($scope, 'pageCount').and.returnValue(3);
    $scope.currentPage = 3;
    expect($scope.nextPageDisabled()).toBe(true);

    $scope.currentPage = 2;
    expect($scope.nextPageDisabled()).toBe(false);
  });

  it('should add page number when click next page',function() {
    createController();
    spyOn($scope, 'pageCount').and.returnValue(3);

    $scope.currentPage = 1;
    $scope.nextPage();
    expect($scope.currentPage).toBe(2);

    $scope.currentPage = 3;
    $scope.nextPage();
    expect($scope.currentPage).toBe(3);
  });

  it('should set page with parameter',function() {
    createController();
    $scope.currentPage = 2;
    $scope.setPage(4);
    expect($scope.currentPage).toBe(4);
  });

});
