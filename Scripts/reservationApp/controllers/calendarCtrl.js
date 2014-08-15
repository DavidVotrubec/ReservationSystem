angular.module("ReservationApp").controller("CalendarCtrl", ["$http", function ($http) {

    //TODO: Move to some config
    var baseUrl = 'http://davidvotrubec.apiary-mock.com/' + 'reservation/';

    var that = this;
    this.filter = { 'class': null, person: null };

    this.days = [];
    this.people = [];
    this.classes = [];

    function loadPeople() {
        $http.get(baseUrl + 'people')
            .success((function (data) {
                that.people = data.items;
            }))
            .error(function () {
                that.isLoadingIngredients = false;
            });
    }

    function loadClasses() {
        $http.get(baseUrl + 'classes')
            .success((function (data) {
                that.classes = data.items;
            }))
            .error(function () {
                that.isLoadingIngredients = false;
            });
    }

    loadClasses();
    loadPeople();

    this.getPeopleForClass = function (classId) {
        return _.filter(that.people, function (p) {
            return p.Class == classId;
        });
    };

    this.isPersonRegistered = function (personId, day) {
        if (personId == null) return false;
        return _.findWhere(day.persons, { Id: personId }) != null;
    };

    function getDays() {
        var today = moment();
        for (var i = 1; i < 31; i++) {
            var day = {
                date: today.add(1, 'days'),
                persons: getRandomPeople()
            };
            that.days.push(day);
        }
    }

    function getRandomPeople() {
        var people = that.getPeopleForClass(that.filter.class || "2");
        return people;
    }

    //TODO: use $q
    setTimeout(getDays, 4000);

} ])