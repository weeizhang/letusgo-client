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

    $httpBackend.expectGET('/api/categories').
      respond(categoryList);
  });

  it('should return the categoryList', function () {
    var callback = jasmine.createSpy('callback');
    callback({
      categoryList: categoryList
    });
    $httpBackend.expectGET('/api/categories');
    categoryService.getAllCategoryInfo(callback, function(){
      $httpBackend.flush();
    });
    expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
      categoryList: categoryList
    }));
  });

  it('should add category info into category list', function () {
    var categoryInfo = {id: 5, name: '文具'};
    categoryList.push(categoryInfo);
    var callback = jasmine.createSpy('callback');
    callback({
      categoryList: categoryList
    });
    $httpBackend.expectPOST('/api/categories');

    categoryService.addCategoryInfo(categoryInfo);
    categoryService.getAllCategoryInfo(callback, function(){
      $httpBackend.flush();
    });
    expect(callback).toHaveBeenCalledWith(jasmine.objectContaining({
      categoryList: categoryList
    }));

  });

});
