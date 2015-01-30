(function(){
    angular.module("ones.statistics", ["ngHighcharts"])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider.when('/statistics/list/dashboard', {
                    templateUrl: appView('dashboard.html', "statistics"),
                    controller: "StatisticsDashboardCtl"
                })
                .when('/statistics/list/test', {
                    template:   '<div class="row"><div class="col-xs-12"><highstock data="stockData"></highstock></div></div>',
                    controller: "StatisticsTestCtl"
                })
            ;
        }])
        .factory("StatisticsDashboardRes", ["$resource", "ones.config", function($resource, cnf){
            return $resource(cnf.BSU + "statistics/dashboard/:id.json", {}, {'query':  {method:'GET', isArray:false}});
        }])
        .factory("StatisticsTestRes", ["$resource", "ones.config", function($resource, cnf){
            return $resource(cnf.BSU + "statistics/test/:id.json", {}, {'query':  {method:'GET', isArray:false}});
        }])
        .controller("StatisticsDashboardCtl", ["$scope", "$timeout", "StatisticsDashboardRes", "$rootScope", 
            function($scope, $timeout, res, $rootScope){
                //变量预设
                var startTime = new Date();
                var endTime = new Date();
                startTime.setMonth(startTime.getMonth()-1);
                $scope.filterFormData = $scope.filterFormData || {};
                $scope.filterFormData._filter_start_dateline = startTime;
                $scope.filterFormData._filter_end_dateline = endTime;
                $scope.filterFormData._filter_timeStep = 60;

                $scope.stockData = [];
                $scope.options = {};

                var doQuery = function () {
                    res.query($scope.filterFormData).$promise.then(function(data){
                        $scope.stockData = data;
                        $scope.symbol = data.title;
                        $scope.now = data.now;
                        $scope.buyTrigger = data.buyTrigger.toFixed(4);
                        $scope.sellTrigger = data.sellTrigger.toFixed(4);
                        $scope.stopLoss = data.stopLoss.toFixed(4);
                    });
                };
                doQuery();
        }])
        .controller("StatisticsTestCtl", ["$scope", "$timeout", "StatisticsTestRes", "$rootScope", 
            function($scope, $timeout, res, $rootScope){
                //变量预设
                var startTime = new Date();
                var endTime = new Date();
                startTime.setMonth(startTime.getMonth()-1);
                $scope.filterFormData = $scope.filterFormData || {};
                $scope.filterFormData._filter_start_dateline = startTime;
                $scope.filterFormData._filter_end_dateline = endTime;
                $scope.filterFormData._filter_timeStep = 60;

                $scope.stockData = [];
                $scope.options = {};

                var doQuery = function () {
                    res.query($scope.filterFormData).$promise.then(function(data){
                        $scope.stockData = data;
                    });
                };
                doQuery();
                //$scope.stockData = $scope.fake_stock_data;
        }])
    ;
})();
