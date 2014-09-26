'use strict';

describe('Controller: CategoryCtrl', function () {

  var $scope, $location, categoryService, createController, categoryList;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();
      $location = $injector.get('$location');
      categoryService = $injector.get('CategoryService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('CategoryCtrl', {
          $scope: $scope,
          $location: $location,
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

  it('should emit to parent controller when come in category manage', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-manage');
  });

  it('should load all category info list', function () {
    spyOn(categoryService, 'getAllCategoryInfo').and.callFake(function (callback) {
      callback(categoryList);
    });
    createController();
    expect($scope.categorys).toEqual(categoryList);
  });


});
