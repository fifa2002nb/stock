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
                //变量预设
                var startTime = new Date();
                var endTime = new Date();
                startTime.setMonth(startTime.getMonth()-1);
                $scope.filterFormData = $scope.filterFormData || {};
                $scope.filterFormData._filter_start_dateline = startTime;
                $scope.filterFormData._filter_end_dateline = endTime;
                $scope.filterFormData._filter_timeStep = 60;
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
                        if(0 < data.length){
                            firstobj = data[0];
                            alert(firstobj.id + "|" + firstobj.taskname + "|" + firstobj.symbol + "|" + firstobj.market + "|" + firstobj.computedays + "|" + firstobj.create_time + "|" + firstobj.expire_time + "|" + firstobj.status);
                        }
                        $scope.tasks = data;
                    });
                };
                doQuery();
        }])
        .controller("OverviewNewappCtl", ["$scope", "$timeout", "OverviewOverviewRes", "$rootScope", 
            function($scope, $timeout, res, $rootScope){
                $('#rootwizard').bootstrapWizard({'tabClass': 'nav nav-tabs', onTabClick: function(tab, navigation, index) {
                    return false;
                }, onTabShow: function(tab, navigation, index) {
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
                }});
        }])

    ;
})();
