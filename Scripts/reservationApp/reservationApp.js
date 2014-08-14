var Module = angular.module("ReservationApp", ["ngRoute", "ngResource"])
.config([
        "$routeProvider",
        "$locationProvider",
        "$httpProvider",
        function ($routeProvider, $locationProvider, $httpProvider) {

            $locationProvider.html5Mode(true);

            $routeProvider.when("/", { templateUrl: "calendar.html", controller: "CalendarCtrl", controllerAs: 'vm', caseInsensitiveMatch: true });

            $routeProvider.otherwise({ redirectTo: "/" });
        }
    ]);