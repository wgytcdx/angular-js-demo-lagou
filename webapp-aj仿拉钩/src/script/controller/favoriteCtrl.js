/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('favoriteCtrl', ['$scope', '$http', function ($scope, $http) {
 $http.get('/data/myFavorite.json').then(function (res) {
   $scope.list = res.data;
 })

}]);