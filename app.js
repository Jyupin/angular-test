(function () {
    'use strict';

    angular.module("mainApp", ['ngSanitize', 'ae-datetimepicker'])
        .controller('homeController', function () {
                var vm = this;

                /*First Task*/
                vm.firstTaskResults = {show: false};
                vm.reverseText = function () {
                    vm.firstTaskResults = {};
                    var lines = vm.firstTaskTargetValue.split('\n');
                    var text = '';

                    angular.forEach(lines, function (line) {
                        line = line.split(' ').reverse().join(' ');
                        text = text + line + '<br>';
                    });

                    vm.firstTaskResults = {
                        show: true,
                        text: text
                    };
                };
                /*First Task Over*/

                /*Second Task*/
                vm.secondTaskResults = {show: false};
                vm.calculateCombinations = function () {
                    vm.secondTaskResults = {};
                    var value = angular.copy(vm.secondTaskTargetValue);
                    var count = 0;

                    for (var a = value; a >= 0; a -= 200) {
                        for (var b = a; b >= 0; b -= 100) {
                            for (var c = b; c >= 0; c -= 50) {
                                for (var d = c; d >= 0; d -= 20) {
                                    for (var e = d; e >= 0; e -= 10) {
                                        for (var f = e; f >= 0; f -= 5) {
                                            for (var g = f; g >= 0; g -= 2) {
                                                count++;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    vm.secondTaskResults = {
                        targetValue: value,
                        count: count,
                        show: true
                    };
                };
                /*Over Second Task*/

                /*Third Task*/
                vm.dateFrom = moment();
                vm.dateTo = moment().add("12", "months");

                vm.options = {
                    format: 'MMMM YYYY',
                    useCurrent: true
                };

                vm.getThirdTaskCounts = function () {
                    vm.thirdTaskResults = {count: 0, show: false};

                    var diffMonth = vm.dateTo.diff(vm.dateFrom, "month");
                    var diffDays = moment(vm.dateTo, "MMMM YYYY").endOf("month").diff(moment(vm.dateFrom, "MMMM YYYY").startOf("month"), "day");
                    if (diffDays <= 31) {
                        diffMonth = 0;
                    }
                    var j = 1;
                    for (var i = 1; i <= diffMonth + 2; i++) {
                        var noOfSunday = 0;
                        if (i == 1) {
                            noOfSunday = getAmountOfWeekDaysInMonth(new moment(vm.dateFrom, "MMMM YYYY"), 0)
                        } else {
                            noOfSunday = getAmountOfWeekDaysInMonth(new moment(vm.dateFrom, "MMMM YYYY").add(j, "months"), 0)
                            j++;
                        }
                        if (noOfSunday == 5) {
                            vm.thirdTaskResults.count++;
                        }
                    }
                    vm.thirdTaskResults.show = true;
                };

                function getAmountOfWeekDaysInMonth(date, weekday) {
                    date.date(1);
                    var dif = (7 + (weekday - date.weekday())) % 7 + 1;
                    return Math.floor((date.daysInMonth() - dif) / 7) + 1;
                }

                /*Over Third Task*/
            }
        );


})();