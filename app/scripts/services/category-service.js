'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function ($http, ProductService) {

    function getCategories(callback) {
      $http.get('/api/categories')
        .success(function (data) {
          callback(data);
        });
    }

    function addCategory(category, callback) {
      $http.post('/api/categories', {'category': category})
        .success(function (data) {
          callback(data);
        });
    }

    function updateCategory(category, callback) {
      var id = category.id;
      $http.put('/api/categories/'+id , {'category': category})
        .success(function (data) {
          callback(data);
        });
    }

    function removeCategory(category, callback) {
      var id = category.id;
      $http.delete('/api/categories/'+id)
        .success(function (data) {
          callback(data);
        });
    }

    this.getAllCategoryInfo = function (callback) {
      getCategories(function(data) {
        callback(data);
      });
    };

    this.getCategoryInfoById = function (id, callback) {
      getCategories(function(data) {
        var category = _.find(data, {'id': id})
        callback(category);
      });
    };

    this.addCategoryInfo = function (categoryInfo, callback) {
      addCategory(categoryInfo, function (data) {
        callback(data);
      });
    };

    this.removeCategoryInfo = function (categoryInfo, callback) {
      if(isRemove(categoryInfo)){
        removeCategory(categoryInfo, function(data) {
          callback(true);
        });
      } else {
        callback(true);
      }
    };

    var isRemove = function (categoryInfo) {
      var productList = ProductService.getAllProductInfo();
      var result = true;
      _.forEach(productList, function (item) {
        if (result === true && item.category === categoryInfo.name) {
          result = false;
        }
      });
      return result;
    };

    this.updateCategoryInfo = function (categoryInfo, callback) {
      updateCategory(categoryInfo, function(data) {
        callback(data);
      });
    };
  });
