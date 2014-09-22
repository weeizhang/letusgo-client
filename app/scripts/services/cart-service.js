'use strict';

angular.module('letusgoApp')
  .service('CartService', function (localStorageService, $http) {

    function addCartItem(item, callback) {
      $http.post('/api/cartItems', {'cartItem': item})
        .success(function (data) {
          callback(data);
        });
    }

    function reduceCartItem(item, callback) {
      var id = item.id;
      $http.delete('/api/cartItems/'+id)
        .success(function (data) {
          callback(data);
        });
    }

    this.getCartItem = function (callback) {
      $http.get('/api/cartItems')
        .success(function (data) {
          callback(data);
        });
    };

    this.getAmount = function () {
      if (localStorageService.get('amounts') === null) {
        localStorageService.set('amounts', 0);
      }
      return localStorageService.get('amounts');
    };

    this.setAmount = function (amount) {
      localStorageService.set('amounts', amount);
    };

    this.categoryCartItem = function (cartItemList) {
      var cartItemGroup = _.map(_.groupBy(cartItemList, function (cartItem) {
        return cartItem.item.category;
      }));
      return cartItemGroup;
    };

    this.addCartItem = function (curitem, callback) {
      addCartItem(curitem, function (data) {
        var amounts = parseInt(localStorageService.get('amounts')) + 1;
        localStorageService.set('amounts', amounts);
        callback(data);
      });

    };

    this.reduceCartItem = function (curitem, callback) {
      reduceCartItem(curitem, function(data) {
        var amounts = parseInt(localStorageService.get('amounts')) - 1;
        localStorageService.set('amounts', amounts);
        callback(data);
      });
    };

    this.totalPrice = function (cartItemList) {

      var array = _.map(cartItemList, function (cartItem) {
        return cartItem.item.price * cartItem.num;
      });

      var sum = 0;
      _.forEach(array, function (item) {
        sum += item;
      });

      return sum;
    };

    this.cleanCart = function (callback) {
      localStorageService.set('amounts', 0);
      var cartItems = [];
      $http({method: 'POST', url: '/api/cartItems', params: {'cartItems':cartItems}})
        .success(function (data) {
          callback(data);
        });
    };
  });
