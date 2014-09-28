'use strict';

describe('Service: categoryService', function () {
  var $httpBackend, categoryService, productService, categoryList;

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

  });

  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
  });

  it('should return the categoryList', function () {
    $httpBackend.expectGET('/api/categories').respond(200, categoryList);
    categoryService.getAllCategoryInfo(function (data){
      expect(data.length).toBe(4);
    });
    $httpBackend.flush();
  });

  it('should return the category info by id', function () {
    $httpBackend.expectGET('/api/categories').respond(200, categoryList);
    categoryService.getCategoryInfoById(1, function (data){
      expect(data).toEqual({id: 1, name: '饮料'});
    });
    $httpBackend.flush();
  });

  //  it('should add category info into category list', function () {
//    var categoryInfo = {id: 5, name: '文具'};
//    categoryList.push(categoryInfo);
//    var callback = jasmine.createSpy('callback');
//    callback({
//      categoryList: categoryList
//    });
//    $httpBackend.expectPOST('/api/categories');
//
//    categoryService.addCategoryInfo(categoryInfo);
//    categoryService.getAllCategoryInfo(callback, function(){
//      $httpBackend.flush();
//    });
//    expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
//      categoryList: categoryList
//    }));
//
//  });

  //    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    var categoryInfo = {id: 5, name: '文具'};
//    var result = categoryService.addCategoryInfo(categoryInfo);
//    expect(result.length).toBe(5);
//    expect(result[4]).toEqual(categoryInfo);

//  it('should call local storage get function when get category info', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    categoryService.getAllCategoryInfo();
//
//    expect(localStorageService.get).toHaveBeenCalled();
//  });
//
//  it('should call local storage get and set function when add category info', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    spyOn(localStorageService, 'set');
//    var categoryInfo = {id: 5, name: '文具'};
//    categoryService.addCategoryInfo(categoryInfo);
//    expect(localStorageService.get.calls.count()).toEqual(1);
//    expect(localStorageService.set.calls.count()).toEqual(1);
//  });
//
//  it('should remove category info into category list', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    var categoryInfo = {id: 4, name: '食品'};
//    var result = categoryService.removeCategoryInfo(categoryInfo);
//    expect(result).toBe(true);
//  });
//
//  it('should call local storage get and set function when reduce category info', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    spyOn(localStorageService, 'set');
//    var categoryInfo = {id: 4, name: '食品'};
//    var result = categoryService.removeCategoryInfo(categoryInfo);
//    expect(result).toBe(true);
//    expect(localStorageService.get.calls.count()).toEqual(2);
//    expect(localStorageService.set.calls.count()).toEqual(1);
//  });
//
//  it('should not reduce category info if have goods', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    spyOn(localStorageService, 'set');
//    var productList = [{'barcode': 'ITEM000000', 'name': '可口可乐', 'unit': '瓶', 'price': 3.00, 'category': '饮料'}];
//    spyOn(productService,'getAllProductInfo').and.returnValue(productList);
//    var categoryInfo = {id: 4, name: '饮料'};
//    var result = categoryService.removeCategoryInfo(categoryInfo);
//    expect(result).toBe(false);
//  });
//
//  it('should update category info into category list', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    var categoryInfo = {id: 4, name: '文具'};
//    var result = categoryService.updateCategoryInfo(categoryInfo);
//    expect(result[3]).toEqual(categoryInfo);
//  });
//
//  it('should call local storage get and set function when update category info', function () {
//    spyOn(localStorageService, 'get').and.returnValue(categoryList);
//    spyOn(localStorageService, 'set');
//    var categoryInfo = {id: 4, name: '文具'};
//    categoryService.updateCategoryInfo(categoryInfo);
//    expect(localStorageService.get.calls.count()).toEqual(1);
//    expect(localStorageService.set.calls.count()).toEqual(1);
//  });

});
