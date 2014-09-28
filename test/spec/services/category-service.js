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

});
