angular.module("ReservationApp").controller("CalendarCtrl", ["$http", "$q", function ($http, $q) {

    //TODO: Move to some config
    var baseUrl = 'http://davidvotrubec.apiary-mock.com/' + 'reservation/';

    var that = this;
    this.filter = { 'class': null, person: null, year: 2014, month: 9 };

    this.days = [];
    this.people = [];
    this.classes = [];
    this.months = [
        { Id: 1, Name: "Leden" },
        { Id: 2, Name: "Únor" },
        { Id: 3, Name: "Březen" },
        { Id: 4, Name: "Duben" },
        { Id: 5, Name: "Květen" },
        { Id: 6, Name: "Červen" },
        { Id: 7, Name: "Červenec" },
        { Id: 8, Name: "Srpen" },
        { Id: 9, Name: "Září" },
        { Id: 10, Name: "Říjen" },
        { Id: 11, Name: "Listopad" },
        { Id: 12, Name: "Prosinec" }
    ];
    this.weekDays = [
        { Order: 1, Name: "Pondělí" },
        { Order: 2, Name: "Úterý" },
        { Order: 3, Name: "Středa" },
        { Order: 4, Name: "Čtvrtek" },
        { Order: 5, Name: "Pátek" },
        { Order: 6, Name: "Sobota" },
        { Order: 7, Name: "Neděle" }
    ];

    function loadReservation() {
        $http.get(baseUrl + 'people/' + that.filter.year + '/' + that.filter.month)
            .success((function (data) {
                that.reservations = data;
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

    function loadAll() {
        $q.all(loadClasses(), loadReservation()).then(function (allData) {
            console.log('all data loaded', allData);
        });
    }

    loadAll();

    this.getPeopleForClass = function (classId) {
        var classFound = _.findWhere(that.classes, { Id: classId });
        return classFound.People;
    };

    this.isPersonRegistered = function (personId, day) {
        if (personId == null) return false;
        return _.findWhere(day.persons, { Id: personId }) != null;
    };

} ])