'use strict';

angular.module('letusgoApp')
  .service('CartService', function (localStorageService, $http) {

    function setData(cartItems, amounts) {
      localStorageService.set('cartItems', cartItems);
      localStorageService.set('amounts', amounts);
    }

    function addCartItem(item) {
      var cartItemList = localStorageService.get('cartItems') || [];

      if (_.any(cartItemList, {'item': item})) {
        var index = _.findIndex(cartItemList, {'item': item});
        cartItemList[index].num++;
      } else {
        var cartItem = {'item': item, 'num': 1};
        cartItemList.push(cartItem);
      }

      setData(cartItemList, parseInt(localStorageService.get('amounts') + 1));
    }

    function reduceCartItem(item, callback) {
      var id = item.id;
      $http.delete('/api/cartItems/'+id)
        .success(function (data) {
          callback(data);
        });
    }

    function toArray(cartItemList) {
      var array = _.map(cartItemList, function (cartItem) {
        return cartItem.item.price * cartItem.num;
      });
      return array;
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

    this.addCartItem = function (item) {
      addCartItem(item);
    };

    this.reduceCartItem = function (curitem, callback) {
      reduceCartItem(curitem, function(data) {
        var amounts = parseInt(localStorageService.get('amounts')) - 1;
        localStorageService.set('amounts', amounts);
        callback(data);
      });
    };

    this.totalPrice = function (cartItemList) {
      var sum = _.reduce(toArray(cartItemList), function(sum, num) {
        return sum + num;
      });

      return sum;
    };

    this.cleanCart = function (callback) {
      localStorageService.set('amounts', 0);
      $http.post('/api/payment')
        .success(function(data) {
          callback(data);
        })
    };
  });
