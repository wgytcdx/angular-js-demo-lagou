/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('meCtrl', ['cache', '$state', '$scope', '$http', function (cache, $state, $scope, $http) {
  if (cache.get('name')) {
    $scope.name = cache.get('name');
    $scope.image = cache.get('image');
    $scope.logout = function () {
      cache.remove('id');
      cache.remove('name');
      cache.remove('image');
      $state.go('main');
    }
  }

}]);