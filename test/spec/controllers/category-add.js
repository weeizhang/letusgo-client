'use strict';

describe('Controller: CategoryAddCtrl', function () {

  var $scope, categoryService, createController, categoryList;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      categoryService = $injector.get('CategoryService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CategoryAddCtrl', {
          $scope: $scope,
          CategoryService: categoryService
        });
      };
    });

    categoryList = [
      {id: 1, name: '饮料'},
      {id: 2, name: '水果'},
      {id: 3, name: '生活用品'},
      {id: 4, name: '食品'}
    ];

  });

  it('should emit to parent controller when come in CategoryAddCtrl', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-manage');
  });

  it('should add category info into category list when category info is not null', function () {
    spyOn(categoryService, 'getAllCategoryInfo').and.returnValue(categoryList);
    categoryList.push({id: 5, name: '文具'});
    spyOn(categoryService, 'addCategoryInfo').and.returnValue(categoryList);
    createController();
    $scope.addcategory = {id: 5, name: '文具'};
    $scope.addCategoryInfo(function(){
      expect(categoryService.addCategoryInfo).toHaveBeenCalled();
      expect($scope.categorys.length).toEqual(5);
    });
  });

  it('should alert info when add category info and category info is undefined', function () {
    spyOn(categoryService, 'getAllCategoryInfo').and.returnValue(categoryList);
    spyOn(categoryService, 'addCategoryInfo').and.returnValue(categoryList);
    createController();
    $scope.addcategory.name = undefined;
    $scope.addCategoryInfo();
    expect($scope.tip).toEqual('请输入类别!');
  });

});
