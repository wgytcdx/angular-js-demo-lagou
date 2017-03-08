/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').controller('companyCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
  $http.get('/data/company.json?id=' + $state.params.id).then(function (res) {
    $scope.company = res.data;
  });

}]);