/**
 * Created by liangweibang on 2017/2/13.
 */
'use strict';

var app = angular.module('app', ['ui.router', 'ngCookies', 'validation']);

/**
 * Created by liangweibang on 2017/2/15.
 */
'use strict';
angular.module('app').value('dict', {}).run(['dict', '$http', function (dict, $http) {
  $http.get('/data/city.json').then(function (res) {
    dict.city = res.data;
  });
  $http.get('/data/salary.json').then(function (res) {
    dict.salary = res.data;
  });
  $http.get('/data/scale.json').then(function (res) {
    dict.scale = res.data;
  });
}]);
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
/**
 * Created by liangweibang on 2017/2/13.
 */
'use strict';

angular.module('app').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
  $stateProvider.state('main', {
    url: '/main',
    templateUrl: 'view/main.html',
    controller: 'mainCtrl'
  }).state('position', {
    url: '/position/:id',
    templateUrl: 'view/position.html',
    controller: 'positionCtrl'
  }).state('company', {
    url: '/company/:id',
    templateUrl: 'view/company.html',
    controller: 'companyCtrl'
  }).state('search', {
    url: '/search',
    templateUrl: 'view/search.html',
    controller: 'searchCtrl'
  }).state('login', {
    url: '/login',
    templateUrl: 'view/login.html',
    controller: 'loginCtrl'
  }).state('register', {
    url: '/register',
    templateUrl: 'view/register.html',
    controller: 'registerCtrl'
  }).state('post', {
    url: '/post',
    templateUrl: 'view/post.html',
    controller: 'postCtrl'
  }).state('me', {
    url: '/me',
    templateUrl: 'view/me.html',
    controller: 'meCtrl'
  }).state('favorite', {
    url: '/favorite',
    templateUrl: 'view/favorite.html',
    controller: 'favoriteCtrl'
  });
  $urlRouterProvider.otherwise('main');
}]);
/**
 * Created by liangweibang on 2017/2/15.
 */
'use strict';
angular.module('app').config(['$validationProvider', function ($validationProvider) {
  var expression = {
    phone: /^1[\d]{10}$/,
    password: function (value) {
      return value.length > 5;
    },
    required: function (value) {
      return !!value;
    }
  };

  var defaultMsg = {
    phone: {
      success: '',
      error: '必须是11位手机号'
    },
    password: {
      success: '',
      error: '长度至少6位'
    },
    required: {
      success: '',
      error: '不能为空'
    }
  };

  $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').controller('companyCtrl', ['$scope', '$state', '$http', function ($scope, $state, $http) {
  $http.get('/data/company.json?id=' + $state.params.id).then(function (res) {
    $scope.company = res.data;
  });

}]);
/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('favoriteCtrl', ['$scope', '$http', function ($scope, $http) {
 $http.get('/data/myFavorite.json').then(function (res) {
   $scope.list = res.data;
 })

}]);
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
/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('mainCtrl', ['$scope', '$http', function ($scope, $http) {
  $http.get('/data/positionList.json').then(function (res) {
    $scope.list = res.data;
  });

}]);
/**
 * Created by liangweibang on 2017/2/13.
 */

angular.module('app').controller('meCtrl', ['cache', '$state', '$scope', '$http', function (cache, $state, $scope, $http) {
  if (cache.get('name')) {
    $scope.name = cache.get('name');
    $scope.image = cache.get('image');
    $scope.logout = function () {
      cache.remove('id');
      cache.remove('name');
      cache.remove('image');
      $state.go('main');
    }
  }

}]);
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
/**
 * Created by liangweibang on 2017/2/15.
 */
angular.module('app').controller('searchCtrl', ['dict', '$scope', '$http', '$state', function (dict, $scope, $http, $state) {
  $scope.name = '';
  $scope.search = function () {
    $http.get('data/positionList.json?name=' + $scope.name).then(function (res) {
      $scope.positionList = res.data;
    });
  };
  $scope.search();
  $scope.sheet = {};
  $scope.filterObj = {};
  $scope.tabList = [{
    id: 'city',
    name: '城市'
  }, {
    id: 'salary',
    name: '薪水'
  }, {
    id: 'scale',
    name: '公司规模'
  }];
  var tabId = '';
  $scope.tClick = function (id, name) {
    tabId = id;
    $scope.sheet.list = dict[id];
    $scope.sheet.visible = true;
  };
  $scope.sClick = function (id, name) {
    if (id) {
      angular.forEach($scope.tabList, function (item) {
        if (item.id === tabId) {
          item.name = name;
        }
      });
      $scope.filterObj[tabId + 'Id'] = id;
    } else {
      delete $scope.filterObj[tabId+'Id'];
      angular.forEach($scope.tabList, function (item) {
        if (item.id === tabId) {
          switch (item.id) {
            case 'city':
              item.name = '城市';
              break;
            case 'salary':
              item.name = '薪资';
              break;
            case 'scale':
              item.name = '公司规模';
              break;
          }
        }
      })
    }
    console.log(id, name);
    $scope.sheet.visible = false;

  }
}]);
/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appCompany', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/company.html',
    scope: {
      isActive: '=',
      com: '='
    },
    link: function ($scope, element, attr) {
      $scope.imagePath = $scope.isActive ? "image/star-active.png" : "image/star.png"
    }
  }
}]);
/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appFoot', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/foot.html'
  }
}]);
/**
 * Created by liangweibang on 2017/2/13.
 */
'use strict';

angular.module('app').directive('appHead', ['cache', function (cache) {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/head.html',
    link: function ($scope) {
      $scope.name = cache.get('name') || '';
    }
  }
}]);
/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appHeadBar', [function () {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/headBar.html',
    scope: {
      text: '@'
    },
    link: function ($scope, element, attr) {
      $scope.back = function () {
        window.history.back();
      };
    }
  }
}]);
/**
 * Created by liangweibang on 2017/2/14.
 */
'use strict';
angular.module('app').directive('appPositionClass', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      com: '=',
      isActive: '='
    },
    templateUrl: 'view/template/positionClass.html',
    link: function ($scope) {
      $scope.showPositionList = function (index) {
        $scope.positionList = $scope.com.positionClass[index].positionList;
        $scope.isActive = index;
      };

      $scope.$watch('com', function (newVal, oldVal, scope) {
        if (newVal) {
          $scope.showPositionList(0)
        }
      });
    }
  }
}]);
/**
 * Created by liangweibang on 2017/2/13.
 */
angular.module('app').directive('appPositionInfo', ['$http', function ($http) {
  return {
    restrict: 'A',
    replace: true,
    templateUrl: 'view/template/positionInfo.html',
    scope: {
      isActive: '=',
      isLogin: '=',
      pos: '='
    },
    link: function ($scope, element, attr) {
      $scope.$watch('pos', function (newVal) {
        if (newVal) {
          $scope.pos.select = $scope.pos.select || false;
          $scope.imagePath = $scope.pos.select ? "image/star-active.png" : "image/star.png"
        }
      });
      $scope.favorite = function () {
        $http.post('/data/favorite.json', {
          id: $scope.pos.id,
          select: !$scope.pos.select
        }).then(function (res) {
          $scope.pos.select = !$scope.pos.select;
          $scope.imagePath = $scope.pos.select ? 'image/star-active.png' : 'image/star.png';
        })
      }
    }
  }
}]);
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
/**
 * Created by liangweibang on 2017/2/15.
 */
angular.module('app').directive('appSheet', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      visible: '=',
      select: '&'
    },
    templateUrl: 'view/template/sheet.html'
  }
}]);
/**
 * Created by liangweibang on 2017/2/15.
 */
angular.module('app').directive('appTab', [function () {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      list: '=',
      tabClick: '&'
    },
    templateUrl: 'view/template/tab.html',
    link: function ($scope) {
      $scope.click = function (tab) {
        $scope.selectId = tab.id;
        $scope.tabClick(tab);
      }
    }
  }
}]);
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
/**
 * Created by liangweibang on 2017/2/15.
 */
'use strict';

angular.module('app').service('cache', ['$cookies', function ($cookies) {
  this.put = function (key, value) {
    $cookies.put(key, value);
  };
  this.get = function (key) {
    return $cookies.get(key);
  };
  this.remove = function (key) {
    $cookies.remove(key);
  };
}]);