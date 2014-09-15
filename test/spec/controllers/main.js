'use strict';

describe('Controller: MainCtrl', function () {

  var $scope, createController;

  beforeEach(function () {
    module('letusgoApp');

    inject(function ($injector) {

      $scope = $injector.get('$rootScope').$new();

      var $controller = $injector.get('$controller');

      createController = function () {
        return $controller('MainCtrl', {
          $scope: $scope
        });
      };
    });
  });

  it('should emit to parent controller', function () {
    spyOn($scope, '$emit');
    createController();
    expect($scope.$emit).toHaveBeenCalledWith('to-parent-inmain');
  });

});
