'use strict';
describe('Service: productService', function () {
  var localStorageService, productService, productList;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      productService = $injector.get('ProductService');
      localStorageService = $injector.get('localStorageService');
    });

    productList = [
      {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'},
      {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'}
    ];
  });

  it('should return productList', function () {

    spyOn(localStorageService, 'get').and.returnValue(productList);
    var result = productService.getAllProductInfo();

    expect(localStorageService.get).toHaveBeenCalled();

    expect(result.length).toBe(3);
  });

  it('should add product info into product list', function () {
    spyOn(localStorageService, 'get').and.returnValue(productList);
    var product = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    var result = productService.addProductInfo(product);
    expect(result.length).toBe(4);
    expect(result[3]).toEqual(product);
  });

  it('should call local storage get and set function when add product info', function () {
    spyOn(localStorageService, 'get').and.returnValue(productList);
    spyOn(localStorageService, 'set');
    var product = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    productService.addProductInfo(product);
    expect(localStorageService.get.calls.count()).toEqual(1);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

  it('should remove product info into product list', function () {
    spyOn(localStorageService, 'get').and.returnValue(productList);
    var product = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var result = productService.removeProductInfo(product);
    expect(result.length).toBe(2);
  });

  it('should call local storage get and set function when reduce product info', function () {
    spyOn(localStorageService, 'get').and.returnValue(productList);
    spyOn(localStorageService, 'set');
    var product = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    productService.removeProductInfo(product);
    expect(localStorageService.get.calls.count()).toEqual(1);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

  it('should update product info into product list', function () {
    spyOn(localStorageService, 'get').and.returnValue(productList);
    var product = {'barcode': 'ITEM000001', 'name': '果粒橙', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var result = productService.updateProductInfo(product);
    expect(result[1]).toEqual(product);
  });

  it('should call local storage get and set function when update product info', function () {
    spyOn(localStorageService, 'get').and.returnValue(productList);
    spyOn(localStorageService, 'set');
    var product = {'barcode': 'ITEM000001', 'name': '果粒橙', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    productService.updateProductInfo(product);
    expect(localStorageService.get.calls.count()).toEqual(1);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

});
