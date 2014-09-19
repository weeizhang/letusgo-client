'use strict';

angular.module('letusgoApp')
  .service('CategoryService', function ($http, ProductService) {

    function getCategories(callback) {
      $http.get('/api/categories')
        .success(function (data) {
          callback(data);
        });
    }

    function setCategories(categories, callback) {
      $http({method: 'POST', url: '/api/categories', params: {'categories': JSON.stringify(categories)}})
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
      getCategories(function(data1) {
        data1.push(categoryInfo);
        setCategories(data1, function(data2) {
          if(data2 === 'OK'){
            callback(data1);
          }
        });
      });
    };

    this.removeCategoryInfo = function (categoryInfo, callback) {
      getCategories(function(data) {
        var categoryList = data;
        if (isRemove(categoryInfo)) {
          var index = _.findIndex(categoryList, {'id': categoryInfo.id});
          categoryList.splice(index, 1);
          setCategories(categoryList, function(data1) {
            if(data1 === 'OK'){
              callback(true);
            }
          });
        } else {
          callback(false);
        }
      });
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
      getCategories(function(data) {
        var categoryList = data;
        var index = _.findIndex(categoryList, {'id': categoryInfo.id});
        categoryList[index] = categoryInfo;
        setCategories(data, function(data1) {
          callback(data1);
        });
      });
    };
  });
