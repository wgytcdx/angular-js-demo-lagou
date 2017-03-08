/**
 * Created by liangweibang on 2017/2/15.
 */
angular.module('app').filter('filterByObj', [function () {
  return function (list, obj) {
    var result = [];
    angular.forEach(list, function (item) {
      var isEqual = true;
      for (var e in obj) {
        if (item[e] !== obj[e]) {
          isEqual = false;
        }
      }
      if (isEqual) {
        result.push(item);
      }
    });
    return result;
  }
}]);