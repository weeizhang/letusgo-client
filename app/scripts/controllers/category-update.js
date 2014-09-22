'use strict';

angular.module('letusgoApp')
  .controller('CategoryUpdateCtrl', function ($scope, $location, CategoryService) {

    $scope.$emit('to-parent-manage');

    var id = $location.search().id;
    CategoryService.getCategoryInfoById(id, function (data) {
      $scope.newcategory = data;
    });

    $scope.updateCategoryInfo = function () {
      CategoryService.updateCategoryInfo($scope.newcategory, function () {
        $location.path('/category');
      });
    };

  });
