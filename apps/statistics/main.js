(function(){
    angular.module("ones.statistics", ["ngHighcharts"])
        .config(["$routeProvider", function($routeProvider){
            $routeProvider.when('/statistics/list/dashboard/:taskname', {
                    templateUrl: appView('dashboard.html', "statistics"),
                    controller: "StatisticsDashboardCtl"
                })
                .when('/statistics/list/details', {
                    template: '<div class="row"><div class="col-xs-12"></div></div>',
                    controller: "StatisticsDetailsCtl"
                })
            ;
        }])
        .factory("StatisticsDashboardRes", ["$resource", "ones.config", function($resource, cnf){
            return $resource(cnf.BSU + "statistics/dashboard/:id.json", {}, {'query':  {method:'GET', isArray:false}});
        }])
        .controller("StatisticsDashboardCtl", ["$scope", "$timeout", "StatisticsDashboardRes", "$rootScope", "$routeParams",
            function($scope, $timeout, res, $rootScope, $routeParams){
                
                $scope.filterFormData = $scope.filterFormData || {};
                $scope.filterFormData.taskname = $routeParams.taskname;
                $scope.filterFormData.uid = (ones.userInfo) ? ones.userInfo.id : -1;
                $scope.stockData = [];
                var doQuery = function () {
                    //$scope.isloading = true;
                    angular.element('#refresh').hide();
                    angular.element('#loading').show();
                    res.query($scope.filterFormData).$promise.then(function(data){
                        $scope.stockData = data;
                        $scope.symbol = data.title;
                        $scope.now = data.now;
                        $scope.commission = data.commission;
                        $scope.buyTrigger = (data.buyTrigger && 0 != data.buyTrigger) ? data.buyTrigger.toFixed(4) : 0;
                        $scope.sellTrigger = (data.sellTrigger && 0 != data.sellTrigger) ? data.sellTrigger.toFixed(4) : 0;
                        $scope.stopLoss = (data.stopLoss && 0 != data.stopLoss) ? data.stopLoss.toFixed(4) : 0;
                        if(data.trades){
                            var tradesLength = data.trades.length;
                            var trades = [];
                            for(var i = 0; i < tradesLength; i++){
                                trades.push({
                                        "open": data.trades[i][2],
                                        "close": data.trades[i][3],
                                        "openPrice": data.trades[i][4],
                                        "closePrice": data.trades[i][5],
                                        "type": data.trades[i][6],
                                        "size": data.trades[i][7],
                                        "purchase": data.trades[i][8],
                                        "profit": data.trades[i][9],
                                        "balance": data.trades[i][10]
                                    });
                            }
                            $scope.trades = trades;
                        }
                        //$scope.isloading = false;
                        angular.element('#refresh').show();
                        angular.element('#loading').hide();
                    });
                };
                $scope.refresh = function () {
                    doQuery();
                };  
                doQuery();
                //$('#dataTables-example').DataTable({"bLengthChange": false, "bFilter": false, "bAutoWidth": true});
            }
        ])
        .controller("StatisticsDetailsCtl", ["$scope", "$timeout", "$rootScope", 
            function($scope, $timeout, $rootScope){
                alert("building..");
            }
        ])
    ;
})();
