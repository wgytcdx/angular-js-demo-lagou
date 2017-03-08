/**
 * Created by liangweibang on 2017/2/15.
 */
angular.module('app').directive('appSheet', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      visible: '=',
      select: '&'
    },
    templateUrl: 'view/template/sheet.html'
  }
}]);