/**
 * Created by liangweibang on 2017/2/14.
 */
'use strict';
angular.module('app').directive('appPositionClass', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '=',
      isActive: '='
    },
    templateUrl: 'view/template/positionClass.html',
    link: function ($scope) {
      $scope.showPositionList = function (index) {
        $scope.positionList = $scope.com.positionClass[index].positionList;
        $scope.isActive = index;
      };

      $scope.$watch('com', function (newVal, oldVal, scope) {
        if (newVal) {
          $scope.showPositionList(0)
        }
      });
    }
  }
}]);