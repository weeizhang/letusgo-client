'use strict';

angular.module('letusgoApp')
  .controller('CategoryCtrl', function ($scope, $location, CategoryService) {

    $scope.$emit('to-parent-manage');

    CategoryService.getAllCategoryInfo(function (data) {
      $scope.categorys = data;
    });
    $scope.tip = '';

    $scope.itemsPerPage = 5;
    $scope.currentPage = 1;

    $scope.pageCount = function () {
      var maxPage = Math.ceil($scope.categorys.length / $scope.itemsPerPage);
      return maxPage;
    };

    $scope.range = function () {
      var pages = [];
      var maxPage = $scope.pageCount();
      for (var i = 1; i <= maxPage; i++) {
        pages.push(i);
      }
      return pages;
    };

    $scope.prevPage = function () {
      if ($scope.currentPage > 1) {
        $scope.currentPage--;
      }
    };

    $scope.prevPageDisabled = function () {
      return $scope.currentPage === 1 ? true : false;
    };

    $scope.nextPage = function () {
      if ($scope.currentPage < $scope.pageCount()) {
        $scope.currentPage++;
      }
    };

    $scope.nextPageDisabled = function () {
      return $scope.currentPage === $scope.pageCount() ? true : false;
    };

    $scope.setPage = function (n) {
      $scope.currentPage = n;
    };


    $scope.removeCategoryInfo = function (categoryInfo) {
      CategoryService.removeCategoryInfo(categoryInfo, function(data) {
        var isRemove = data;
        if (isRemove) {
          $scope.tip = '';
          $scope.categorys = CategoryService.getAllCategoryInfo();
        } else {
          $scope.tip = '该类别下有商品，无法删除！';
        }
      });
    };

    $scope.updateClick = function (categoryInfo) {
      $location.path('/category-update');
      $location.search({'id': categoryInfo.id});
    };

    $scope.addCategoryClick = function () {
      $location.path('/category-add');
    };
  });
