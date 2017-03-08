/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('loginCtrl', ['cache', '$scope', '$http', '$state', function (cache, $scope, $http, $state) {
  $scope.submit = function () {
    $http.post('/data/login.json', $scope.user).then(function (res) {
      cache.put('id', res.data.id);
      cache.put('name', res.data.name);
      cache.put('image', res.data.image);
      $state.go('main');
    });
  };
}]);