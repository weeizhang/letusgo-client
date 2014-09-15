'use strict';

describe('Service: categoryService', function () {
  var localStorageService, categoryService, categoryList;

  beforeEach(function () {
    module('letusgoApp');
    inject(function ($injector) {
      categoryService = $injector.get('categoryService');
      localStorageService = $injector.get('localStorageService');
    });

    categoryList = [
      {id: 1, name: '饮料'},
      {id: 2, name: '水果'},
      {id: 3, name: '生活用品'},
      {id: 4, name: '食品'}
    ];
  });

  it('should return the categoryList', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    var result = categoryService.getAllCategoryInfo();
    expect(result).toEqual(categoryList);
  });

  it('should call local storage get function when get category info', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    categoryService.getAllCategoryInfo();

    expect(localStorageService.get).toHaveBeenCalled();
  });

  it('should add category info into category list', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    var categoryInfo = {id: 5, name: '文具'};
    var result = categoryService.addCategoryInfo(categoryInfo);
    expect(result.length).toBe(5);
    expect(result[4]).toEqual(categoryInfo);
  });

  it('should call local storage get and set function when add category info', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    spyOn(localStorageService, 'set');
    var categoryInfo = {id: 5, name: '文具'};
    categoryService.addCategoryInfo(categoryInfo);
    expect(localStorageService.get.calls.count()).toEqual(1);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

  it('should remove category info into category list', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    var categoryInfo = {id: 4, name: '食品'};
    var result = categoryService.removeCategoryInfo(categoryInfo);
    expect(result).toBe(true);
  });

  it('should call local storage get and set function when reduce category info', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    spyOn(localStorageService, 'set');
    var categoryInfo = {id: 4, name: '食品'};
    categoryService.removeCategoryInfo(categoryInfo);
    expect(localStorageService.get.calls.count()).toEqual(2);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

  it('should update category info into category list', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    var categoryInfo = {id: 4, name: '文具'};
    var result = categoryService.updateCategoryInfo(categoryInfo);
    expect(result[3]).toEqual(categoryInfo);
  });

  it('should call local storage get and set function when update category info', function () {
    spyOn(localStorageService, 'get').and.returnValue(categoryList);
    spyOn(localStorageService, 'set');
    var categoryInfo = {id: 4, name: '文具'};
    categoryService.updateCategoryInfo(categoryInfo);
    expect(localStorageService.get.calls.count()).toEqual(1);
    expect(localStorageService.set.calls.count()).toEqual(1);
  });

});
