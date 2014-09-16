'use strict';

describe('Controller: IndexController', function () {

  var $rootScope, $scope, cartService, createController;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $rootScope = $injector.get('$rootScope');
      $scope = $rootScope.$new();
      cartService = $injector.get('CartService');

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('IndexController', {
          $scope: $scope,
          CartService: cartService
        });
      };
    });

  });

  it('should call getAmount in cartService and return to amounts', function () {
    spyOn(cartService, 'getAmount');
    var amount = cartService.getAmount();
    expect($scope.amounts).toBe(amount);
  });

  it('should listen for the to-parent-changeamounts broadcast and called getAmount', function () {
    createController();
    $scope.$digest();
    spyOn(cartService, 'getAmount').and.returnValue(6);

    $rootScope.$broadcast('to-parent-changeamounts');
    $scope.$digest();

    expect(cartService.getAmount).toHaveBeenCalled();
    expect($scope.amounts).toBe(6);
  });

  it('should listen for the to-parent-inmain broadcast and set bar active', function () {
    createController();
    $scope.$digest();

    $rootScope.$broadcast('to-parent-inmain');
    $scope.$digest();

    expect($scope.activeMainbar).toBe(true);
    expect($scope.activeListbar).toBe(false);
    expect($scope.activeCartbar).toBe(false);
  });

  it('should listen for the to-parent-inlist broadcast and set bar active', function () {

    spyOn(cartService, 'getAmount');

    createController();
    $scope.$digest();

    $rootScope.$broadcast('to-parent-inlist');
    $scope.$digest();

    expect(cartService.getAmount.calls.count()).toEqual(2);

    expect($scope.activeMainbar).toBe(false);
    expect($scope.activeListbar).toBe(true);
    expect($scope.activeCartbar).toBe(false);
  });

  it('should listen for the to-parent-incart broadcast and set bar active', function () {
    createController();
    $scope.$digest();

    $rootScope.$broadcast('to-parent-incart');
    $scope.$digest();

    expect($scope.activeMainbar).toBe(false);
    expect($scope.activeListbar).toBe(false);
    expect($scope.activeCartbar).toBe(true);
  });

});
