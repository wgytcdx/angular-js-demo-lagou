/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('positionCtrl', ['$log', 'cache', '$scope', '$http', '$state', function ($log, cache, $scope, $http, $state) {
  $scope.isLogin = false;
  $scope.isLogin = cache.get('name') || false;
  $scope.message = $scope.isLogin ? '投个简历' : '去登录';
  $http.get('/data/position.json?id=' + $state.params.id).then(function (res) {
    $scope.position = res.data;
    console.log($scope.position);
    if ($scope.posted) {
      $scope.message = '已投递';
    }
    $http.get('/data/company.json?id=' + $scope.position.companyId).then(function (res) {
      $scope.company = res.data;
    })
  });
  $scope.go = function () {
    if ($scope.message !== '已投递') {
      if ($scope.isLogin) {
        $http.get('/data/handle.json', {
          id: $scope.position.id
        }).then(function (res) {
          $log.info(res);
          $scope.message = '已投递';
        })
      } else {
        $state.go('login');
      }
    }
  }
}]);