'use strict';

angular.module('letusgoApp')
  .controller('CategoryAddCtrl', function ($scope, $location, CategoryService) {

    function addCategory() {
      $scope.addcategory.id = $scope.categorys[$scope.categorys.length - 1].id + 1;
      $scope.categorys = CategoryService.addCategoryInfo($scope.addcategory);
    }

    $scope.$emit('to-parent-manage');

    $scope.addcategory = {};
    $scope.tip = '';

    $scope.categorys = CategoryService.getAllCategoryInfo();

    $scope.addCategoryInfo = function () {
      if ($scope.addcategory.name !== undefined) {
        $scope.tip = '';
        addCategory();
        $location.path('/category');
      } else {
        $scope.tip = '请输入类别!';
      }
    };

  });
