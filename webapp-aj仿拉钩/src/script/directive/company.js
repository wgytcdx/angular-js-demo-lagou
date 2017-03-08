/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appCompany', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/company.html',
    scope: {
      isActive: '=',
      com: '='
    },
    link: function ($scope, element, attr) {
      $scope.imagePath = $scope.isActive ? "image/star-active.png" : "image/star.png"
    }
  }
}]);