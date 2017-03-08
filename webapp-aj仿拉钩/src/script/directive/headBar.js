/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appHeadBar', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/headBar.html',
    scope: {
      text: '@'
    },
    link: function ($scope, element, attr) {
      $scope.back = function () {
        window.history.back();
      };
    }
  }
}]);