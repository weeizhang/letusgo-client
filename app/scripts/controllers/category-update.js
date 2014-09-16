'use strict';

angular.module('letusgoApp')
  .controller('CategoryUpdateCtrl', function ($scope, $location, CategoryService) {

    $scope.$emit('to-parent-manage');

    var id = $location.search().id;
    $scope.newcategory = CategoryService.getCategoryInfoById(id);

    $scope.updateCategoryInfo = function () {
      CategoryService.updateCategoryInfo($scope.newcategory);
      $location.path('/category');
    };

  });
