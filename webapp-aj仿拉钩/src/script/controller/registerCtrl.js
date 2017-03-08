/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('registerCtrl', ['$interval', '$scope', '$http', '$state', function ($interval, $scope, $http, $state) {
  $scope.submit = function () {
    $http.post('/data/regist.json', $scope.user).then(function (res) {
      $state.go('login');
    })
  };

  var count = 60;
  $scope.send = function () {
    // console.log($scope.user.code);
    $http.get('/data/code.json').then(function (res) {
      console.log(res);
      if (1===res.data.state) {
        count = 60;
        $scope.time = '60s';
        var interval = $interval(function () {
          if (count <= 0) {
            $interval.cancel(interval);
            $scope.time = '';
            return;
          }
          count--;
          $scope.time = count + 's';
        }, 1000);
      }
    });
  }

}]);