(function() {
    'use strict';
    angular.module('ngHighcharts', []);
    angular.module('ngHighcharts').directive('highchart', function(highchart) {
        return {
            restrict: 'AE',
            replace: true,
            template: '<div></div>',
            scope: {
                data: '=',
                options: '='
            },
            link: function(scope, element, attrs) {
                var type = 'line';
                var title = '';
                var subtitle = '';
                var xAxisTitle = '';
                var yAxisTitle = '';
                var xAxisCategories = [];
                var series = [];
                var height = 600;
                var chartOptions = {};

                if (attrs.type) {
                    type = attrs.type.toLowerCase();
                }
                if (attrs.title) {
                    title = attrs.title;
                }
                if (attrs.subtitle) {
                    subtitle = scope.$parent.$eval(attrs.subtitle);
                }
                if (attrs.xTitle) {
                    xAxisTitle = attrs.xTitle;
                }
                if (attrs.yTitle) {
                    yAxisTitle = scope.$parent.$eval(attrs.yTitle);
                }
                if (attrs.categories) {
                    xAxisCategories = attrs.categories;
                }
                if (attrs.height) {
                    height = eval(attrs.height);
                }

                angular.extend(chartOptions, highchart.defaultOptions(), scope.options);
                
                if (chartOptions) {
                    chartOptions.chart.type = type;
                    chartOptions.title.text = title;
                    chartOptions.subtitle.text = subtitle;
                    chartOptions.xAxis.title.text = xAxisTitle;
                    chartOptions.yAxis.title.text = yAxisTitle;
                    chartOptions.chart.height = height;
                }

                scope.$watch('data', function(val) {
                    var temp = [];
                    series = [];
                    xAxisCategories = [];
                    for (var i = 0; i < val.length; i++) {

                        // categories
                        var item = val[i][attrs.categoryField];
                        if (xAxisCategories.length == 0 || xAxisCategories.indexOf(item) < 0) {
                            xAxisCategories.push(item);
                        }

                        // series
                        var obj = {};
                        obj.name = val[i][attrs.displayName];
                        obj.data = [];

                        for (var j = 0; j < val.length; j++) {
                            if (obj.name == val[j][attrs.displayName]) {
                                var value = val[j][attrs.yField];
                                obj.data.push(value);
                            }
                        }

                        if (series.length == 0 || temp.indexOf(obj.name) < 0) {
                            temp.push(obj.name);
                            series.push(obj);
                        }
                    }

                    chartOptions.xAxis.categories = eval(xAxisCategories);
                    if (chartOptions && chartOptions.series) {
                        chartOptions.series = series;
                        element.highcharts(chartOptions);
                    }
                });

            }
        }
    });

    angular.module('ngHighcharts').factory('highchart', function() {
        return {
            defaultOptions: function() {
                return {
                    chart: {
                        animation: true,
                        type: ''
                    },
                    title: {
                        text: ''
                    },
                    subtitle: {
                        text: ''
                    },
                    credits: {
                        enabled: false
                    },
                    legend: {
                        labelFormat: '{name}'
                    },
                    series: [],
                    xAxis: {
                        categories: [],
                        title: {
                            text: ''
                        }
                    },
                    yAxis: {
                        categories: null,
                        title: {
                            text: ''
                        }
                    }
                }
            }
        }
    });
    angular.module('ngHighcharts').directive('highstock', function(highstock) {
            return {
                restrict: 'AE',
                replace: true,
                template: '<div></div>',
                scope: {
                    data: '=',
                    options: '='
                },
                link: function(scope, element, attrs) {
                    var selected = 1;
                    var titleText = '';
                    var yAxis1TitleText = 'OHLC';
                    var yAxis1Height = '60%';
                    var yAxis2TitleText = 'Volume';
                    var yAxis2Top = '65%';
                    var yAxis2Height = '35%';
                    var series = [];
                    var chartOptions = {};
                    if(attrs.selected){
                        selected = attrs.selected;
                    }
                    if(attrs.titleText){
                        titleText = attrs.titleText;
                    }
                    if(attrs.yAxis1TitleText){
                        yAxis1TitleText = attrs.yAxis1TitleText;
                    }
                    if(attrs.yAxis1Height){
                        yAxis1Height = attrs.yAxis1Height;
                    }
                    if(attrs.yAxis2TitleText){
                        yAxis2TitleText = attrs.yAxis2TitleText;
                    }
                    if(attrs.yAxis2Top){
                        yAxis2Top = attrs.yAxis2Top;
                    }
                    if(attrs.yAxis2Height){
                        yAxis2Height = attrs.yAxis2Height;
                    }
                    angular.extend(chartOptions, highstock.defaultOptions(), scope.options);
                    
                    if (chartOptions) {
                        chartOptions.rangeSelector.selected = selected;
                        chartOptions.title.text = titleText;
                        if(2 == chartOptions.yAxis.length){
                            chartOptions.yAxis[0].title.text = yAxis1TitleText;
                            chartOptions.yAxis[0].height = yAxis1Height;
                            chartOptions.yAxis[0].lineWidth = 2;
                            chartOptions.yAxis[1].title.text = yAxis2TitleText;
                            chartOptions.yAxis[1].top = yAxis2Top;
                            chartOptions.yAxis[1].height = yAxis2Height;
                            chartOptions.yAxis[1].offset = 0;
                            chartOptions.yAxis[1].lineWidth = 2;
                        }
                    }
                    scope.chartOptions = chartOptions;
                    
                    scope.$watch('data', function(val) {
                        var ohlc = [];
                        var volume = [];
                        var types = val.types;
                        var names = val.names;
                        if(val.data && val.data instanceof Array){
                            var dataLength = val.data.length;
                            for (var i = 0; i < dataLength; i++) {
                                ohlc.push([
                                    val.data[i][0], // the date
                                    val.data[i][1], // open
                                    val.data[i][2], // high
                                    val.data[i][3], // low
                                    val.data[i][4] // close
                                ]);
                              
                                volume.push([
                                    val.data[i][0], // the date
                                    val.data[i][5] // the volume
                                ])
                            }
                    
                            if (chartOptions && chartOptions.series && 2 == chartOptions.series.length) {
                                chartOptions.series[0].data = ohlc;
                                chartOptions.series[1].data = volume;
                                if(types && 2 == types.length){
                                    chartOptions.series[0].type = types[0];
                                    chartOptions.series[1].type = types[1];
                                }
                                if(names && 2 == names.length){
                                    chartOptions.series[0].name = names[0];
                                    chartOptions.series[1].name = names[1];
                                }
                                element.highcharts('StockChart', chartOptions);
                                //element.highcharts(chartOptions);
                            }
                        }
                    });
                }
            }
        });

        angular.module('ngHighcharts').factory('highstock', function() {
            return {
                defaultOptions: function() {
                    var groupingUnits = [[
                        'week',                         // unit name
                        [1]                             // allowed multiples
                    ], [
                        'month',
                        [1, 2, 3, 4, 6]
                    ]];
                    return {
                        rangeSelector: {
                            selected: 1
                        },

                        title: {
                            text: 'AAPL Historical'
                        },

                        yAxis: [{
                            title: {
                                text: 'OHLC'
                            },
                            height: 200,
                            lineWidth: 2
                        }, {
                            title: {
                                text: 'Volume'
                            },
                            top: 300,
                            height: 100,
                            offset: 0,
                            lineWidth: 2
                        }],
                        
                        series: [{
                            type: 'candlestick',
                            name: 'AAPL',
                            data: [],
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }, {
                            type: 'column',
                            name: 'Volume',
                            data: [],
                            yAxis: 1,
                            dataGrouping: {
                                units: groupingUnits
                            }
                        }]
                    }
                }
            }
        });
})();
