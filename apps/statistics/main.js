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
                $scope.tradesinfo = [];
                var doQuery = function () {
                    $('#myModal').modal({show: true, backdrop: true});
                    var total=10000;
                    var breaker=100;
                    var turn=100/(total/breaker);
                    var progress=0;
                    var timer = setInterval(function(){
                                progress=progress+turn;
                                $("#aa").html("loading..." + progress + "%");
                                $("#processbar").attr("style", "width:" + progress + "%");
                                if (progress>=100) {
                                    clearInterval(timer);
                                }
                            }, breaker);

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
                        $('#myModal').modal('hide');
                        timer.clearInterval(timer);
                    });
                };
                $scope.refresh = function () {
                    doQuery();
                };  
                doQuery();
                //$('#dataTables-example').DataTable({"bLengthChange": false, "bFilter": false, "bAutoWidth": true});
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
