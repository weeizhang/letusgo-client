'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function ($http, ProductService) {

    function getCategories(callback) {
      $http.get('/categories')
        .success(function (data) {
          callback(data);
        });
    }

    function getCategoryById(id, callback) {
      $http.get('/categories/' + id)
        .success(function (data) {
          callback(data);
        });
    }

    function addCategory(category, callback) {
      $http.post('/categories', {'category': category})
        .success(function (data) {
          callback(data);
        });
    }

    function updateCategory(category, callback) {
      var id = category.id;
      $http.put('/categories/' + id, {'category': category})
        .success(function (data) {
          callback(data);
        });
    }

    function removeCategory(category, callback) {
      var id = category.id;
      $http.delete('/categories/' + id)
        .success(function (data) {
          callback(data);
        });
    }

    this.getAllCategoryInfo = function (callback) {
      getCategories(function (data) {
        callback(data);
      });
    };

    this.getCategoryInfoById = function (id, callback) {
      getCategoryById(id, function (data) {
        callback(data);
      });
    };

    this.addCategoryInfo = function (categoryInfo, callback) {
      addCategory(categoryInfo, function (data) {
        callback(data);
      });
    };

    this.removeCategoryInfo = function (categoryInfo, callback) {
      if (isRemove(categoryInfo)) {
        removeCategory(categoryInfo, function (data) {
          callback(true);
        });
      } else {
        callback(true);
      }
    };

    var isRemove = function (categoryInfo) {
      var productList = null;
      ProductService.getAllProductInfo(function (data) {
        productList = data;
      });
      var result = true;
      _.forEach(productList, function (item) {
        if (result === true && item.category === categoryInfo.name) {
          result = false;
        }
      });
      return result;
    };

    this.updateCategoryInfo = function (categoryInfo, callback) {
      updateCategory(categoryInfo, function (data) {
        callback(data);
      });
    };
  });
