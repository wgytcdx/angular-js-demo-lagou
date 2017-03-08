/**
 * Created by liangweibang on 2017/2/15.
 */
'use strict';
angular.module('app').config(['$provide', function ($provider) {
  $provider.decorator('$http', ['$delegate', '$q', function ($delegate, $q) {
    var get = $delegate.get;
    $delegate.post = function (url, data, config) {
      var def = $q.defer();
      $delegate.get(url).then(function (res) {
        def.resolve(res);
      });
      return def.promise.then();
    };
    return $delegate;
  }]);
}]);