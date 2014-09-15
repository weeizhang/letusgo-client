'use strict';

/**
 * @ngdoc overview
 * @name angularLetusgoApp
 * @description
 * # angularLetusgoApp
 *
 * Main module of the application.
 */
angular
  .module('letusgoApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'LocalStorageModule'
  ])
  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ls');
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/list', {
        templateUrl: 'views/list.html',
        controller: 'ListCtrl'
      })
      .when('/cart', {
        templateUrl: 'views/cart.html',
        controller: 'CartCtrl'
      })
      .when('/inventory', {
        templateUrl: 'views/inventory.html',
        controller: 'InventoryCtrl'
      })
      .when('/category', {
        templateUrl: 'views/manage-category.html',
        controller: 'CategoryCtrl'
      })
      .when('/category-add', {
        templateUrl: 'views/manage-category-add.html',
        controller: 'CategoryAddCtrl'
      })
      .when('/category-update', {
        templateUrl: 'views/manage-category-update.html',
        controller: 'CategoryUpdateCtrl'
      })
      .when('/product', {
        templateUrl: 'views/manage-product.html',
        controller: 'ProductCtrl'
      })
      .when('/product-add', {
        templateUrl: 'views/manage-product-add.html',
        controller: 'ProductAddCtrl'
      })
      .when('/product-update', {
        templateUrl: 'views/manage-product-update.html',
        controller: 'ProductUpdateCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
