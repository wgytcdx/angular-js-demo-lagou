/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('postCtrl', ['$scope', '$http', function ($scope, $http) {
  $scope.tabList = [{
    id: 'all',
    name: '全部',
  }, {
    id: 'pass',
    name: '面试邀请'
  }, {
    id: 'fail',
    name: '不合适'
  }];
  $http.get('/data/myPost.json').then(function (res) {
    $scope.positionList = res.data;
  });
  $scope.filterObj = {};
  $scope.tClick = function (id, name) {
    console.log(id)
    switch (id) {
      case 'all':
        delete $scope.filterObj.state;
        break;
      case 'pass':
        $scope.filterObj.state = '1';
        break;
      case 'fail':
        $scope.filterObj.state = '-1';
        break
    }
  }
}]);