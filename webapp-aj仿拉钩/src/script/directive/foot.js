/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appFoot', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}]);