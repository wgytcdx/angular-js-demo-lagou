/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/data/positionList.json').then(function (res) {
    $scope.list = res.data;
  });

}]);