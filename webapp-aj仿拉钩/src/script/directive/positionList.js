/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appPositionList', ['cache', '$http', function (cache, $http) {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionList.html',
    scope: {
      data: '=',
      filterList: '=',
      filterObj: '=',
      isFavorite: '='
    },
    link: function ($scope) {
      $scope.name = cache.get('name') || '';
      $scope.select = function (item) {
        $http.post('/data/favorite.json', {
          id: item.id,
          select: !item.select
        });
        item.select = !item.select;
      }
    }
  }
}]);