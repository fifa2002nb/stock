(function(){
    angular.module("ones.overview", [])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider.when('/overview/list/overview', {
                    templateUrl: appView('overview.html', "overview"),
                    controller: "OverviewOverviewCtl"
                })
            ;
        }])
        .factory("OverviewOverviewRes", ["$resource", "ones.config", function($resource, cnf){
            return $resource(cnf.BSU + "overview/overview/:id.json", {}, {'query':  {method:'GET', isArray:false}});
        }])
        .controller("OverviewOverviewCtl", ["$scope", "$timeout", "OverviewOverviewRes", "$rootScope", 
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
                $scope.tradesinfo = [];
                var doQuery = function () {
                    res.query($scope.filterFormData).$promise.then(function(data){
                        $scope.stockData = data;
                        $scope.symbol = data.title;
                        $scope.now = data.now;
                        $scope.commission = data.commission;
                        $scope.buyTrigger = data.buyTrigger.toFixed(4);
                        $scope.sellTrigger = data.sellTrigger.toFixed(4);
                        $scope.stopLoss = data.stopLoss.toFixed(4);
                        var tradesLength = data.trades.length;
                        var trades = [];
                        $scope.trades = trades;
                    });
                };
                doQuery();
        }])
    ;
})();
