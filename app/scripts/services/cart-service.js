'use strict';

angular.module('letusgoApp')
  .service('CartService', function (localStorageService, $http) {

    function setData(cartItems, amounts, callback) {

      $http({method: 'POST', url: '/api/cartItems', params: {'cartItems': JSON.stringify(cartItems)}})
        .success(function (data) {
          callback(data);
        });

      localStorageService.set('amounts', amounts);
    }

    function getCartItems(callback) {
      $http.get('/api/cartItems')
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

    this.addCartItem = function (curitem) {

      var cartItemList = [];
      getCartItems(function (data) {
        cartItemList = data || [];
        if (_.any(cartItemList, {'item': curitem})) {
          var index = _.findIndex(cartItemList, {'item': curitem});
          cartItemList[index].num++;
        } else {
          var cartItem = {'item': curitem, 'num': 1};
          cartItemList.push(cartItem);
        }

        setData(cartItemList, parseInt(localStorageService.get('amounts')) + 1, function (data) {

        });
      });

    };

    this.reduceCartItem = function (curitem) {

      var cartItemList = [];
      getCartItems(function (data) {
        cartItemList = data || [];
        var index = _.findIndex(cartItemList, {'item': curitem});
        cartItemList[index].num--;

        if (cartItemList[index].num <= 0) {
          _.remove(cartItemList, cartItemList[index]);
        }

        setData(cartItemList, parseInt(localStorageService.get('amounts')) + 1, function (data) {

        });
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

    this.cleanCart = function () {
      localStorageService.remove('cartItems');
      localStorageService.set('amounts', 0);
    };
  });
