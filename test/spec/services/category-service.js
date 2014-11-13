'use strict';

describe('Service: categoryService', function () {
  var $httpBackend, categoryService, productService, categoryList, items;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      categoryService = $injector.get('CategoryService');
      productService = $injector.get('ProductService');
      $httpBackend = $injector.get('$httpBackend');
    });

    categoryList = [
      {id: 1, name: '饮料'},
      {id: 2, name: '水果'},
      {id: 3, name: '生活用品'},
      {id: 4, name: '食品'}
    ];

    var item1 = {'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item2 = {'barcode': 'ITEM000001', 'name': '雪碧', 'unit': '瓶', 'price': 3.00, 'category': '饮料'};
    var item3 = {'barcode': 'ITEM000002', 'name': '苹果', 'unit': '斤', 'price': 5.50, 'category': '水果'};
    var item4 = {'barcode': 'ITEM000003', 'name': '荔枝', 'unit': '斤', 'price': 15.00, 'category': '水果'};
    var item5 = {'barcode': 'ITEM000004', 'name': '电池', 'unit': '个', 'price': 2.00, 'category': '生活用品'};
    var item6 = {'barcode': 'ITEM000005', 'name': '方便面', 'unit': '袋', 'price': 4.50, 'category': '食品'};
    items = [item1, item2, item3, item4, item5, item6];

  });

  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should return the categoryList', function () {
    $httpBackend.expectGET('/api/categories').respond(200, categoryList);
    categoryService.getAllCategoryInfo(function (data) {
      expect(data.length).toBe(4);
    });
    $httpBackend.flush();
  });

  it('should return the category info by id', function () {
    var category = {id: 1, name: '饮料'};
    $httpBackend.expectGET('/api/categories/1').respond(200, category);
    categoryService.getCategoryInfoById(1, function (data) {
      expect(data).toEqual({id: 1, name: '饮料'});
    });
    $httpBackend.flush();
  });

  it('should add category info into category list', function () {
    var categoryInfo = {id: 5, name: '文具'};
    categoryList.push(categoryInfo);
    $httpBackend.expectPOST('/api/categories', {category: categoryInfo}).respond(200, categoryList);
    categoryService.addCategoryInfo(categoryInfo, function (data) {
      expect(data.length).toBe(5);
    });
    $httpBackend.flush();
  });

  it('should remove category info from category list', function () {
    $httpBackend.expectGET('/api/items').respond(200, items);
    var categoryInfo = {id: 4, name: '食品'};
    categoryList.splice(3, 1);
    $httpBackend.expectDELETE('/api/categories/4').respond(200, true);
    categoryService.removeCategoryInfo(categoryInfo, function (data) {
      expect(data).toBe(true);
    });
    $httpBackend.flush();
  });

  it('should update category info into category list', function () {
    var categoryInfo = {id: 4, name: '文具'};
    categoryList.splice(3,1);
    categoryList.push(categoryInfo);
    $httpBackend.expectPUT('/api/categories/4', {category: categoryInfo}).respond(200, categoryList);
    categoryService.updateCategoryInfo(categoryInfo, function (data) {
      expect(data[3]).toEqual(categoryInfo);
    });
    $httpBackend.flush();
  });

});
