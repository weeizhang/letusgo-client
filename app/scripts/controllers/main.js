'use strict';

angular.module('letusgoApp')
  .controller('MainCtrl', function ($scope) {

    $scope.$emit('to-parent-inmain');

  });
