(function(){
    angular.module("ones.overview", [])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider.when('/overview/list/overview', {
                    templateUrl: appView('overview.html', "overview"),
                    controller: "OverviewOverviewCtl"
                })
                .when('/overview/list/newapp', {
                    templateUrl: appView('newapp.html', "overview"),
                    controller: "OverviewNewappCtl"
                })

            ;
        }])
        .factory("OverviewOverviewRes", ["$resource", "ones.config", function($resource, cnf){
            return $resource(cnf.BSU + "overview/overview/:id.json", {}, {
                'query':  {method: 'GET', isArray: true},
                'update': {method: 'PUT'}
            });
        }])
        .controller("OverviewOverviewCtl", ["$scope", "$timeout", "OverviewOverviewRes", "$rootScope", 
            function($scope, $timeout, res, $rootScope){
                $scope.filterFormData = $scope.filterFormData || {};
                if(ones.userInfo){
                    $scope.filterFormData.uid = ones.userInfo.id;
                }
                else
                    $scope.filterFormData.uid = -1;

                $scope.stockData = [];
                $scope.options = {};
                $scope.tradesinfo = [];
                var doQuery = function () {
                    res.query($scope.filterFormData).$promise.then(function(data){
                        $scope.tasks = data;
                    });
                };
                doQuery();
        }])
        .controller("OverviewNewappCtl", ["$scope", "$timeout", "OverviewOverviewRes", "$rootScope", 
            function($scope, $timeout, res, $rootScope){
                $('#rootwizard').bootstrapWizard({'tabClass': 'nav nav-tabs', 
                    onTabClick: function(tab, navigation, index) {
                        return false;
                    }, 
                    onTabShow: function(tab, navigation, index) {
                        var $total = navigation.find('li').length;
                        var $current = index + 1;
                        if($current >= $total) {
                            $('#rootwizard').find('.pager .next').hide();
                            $('#rootwizard').find('.pager .finish').show();
                            $('#rootwizard').find('.pager .finish').removeClass('disabled');
                        }
                        else{
                            $('#rootwizard').find('.pager .next').show();
                            $('#rootwizard').find('.pager .finish').hide();
                        }
                    },
                    onNext: function(tab, navigation, index){
                        if(!$scope.appname){
                            alert("appname is required.");
                            return false;
                        }
                        if(!$scope.stocksymbol){
                            alert("stocksymbol is required.");
                            return false;
                        }
                        if(!$scope.market){
                            alert("market is required.");
                            return false;
                        }
                    },
                    onFinish: function(tab, navigation, index){
                    }
                });
        }])
    ;
})();
