angular.module("ReservationApp").controller("CalendarCtrl", ["$http", "$q", function ($http, $q) {

    //TODO: Move to some config
    var baseUrl = 'http://davidvotrubec.apiary-mock.com/' + 'reservation/';

    var that = this;
    this.filter = { 'class': '1', person: null, year: 2014, month: 9 };

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
        { Order: 0, Name: "Pondělí", Program: "Výlet" },
        { Order: 1, Name: "Úterý", Program: "Malování" },
        { Order: 2, Name: "Středa", Program: "Muzicírování" },
        { Order: 3, Name: "Čtvrtek", Program: "Pečení" },
        { Order: 4, Name: "Pátek", Program: "Řemesla" },
    //{ Order: 5, Name: "Sobota" },
    //{ Order: 6, Name: "Neděle" }
    ];

    that.loadReservation = function () {
        if (that.filter.class == null || that.filter.class == '') {
            return;
        }

        that.isLoading = true;
        $http.get(baseUrl + 'people/' + that.filter.class + '/' + that.filter.year + '/' + that.filter.month)
            .success((function (data) {
                that.reservations = data;
                that.isLoading = false;
            }))
            .error(function () {
                that.isLoading = false;
            });
    };

    function loadClasses() {
        $http.get(baseUrl + 'classes')
            .success((function (data) {
                that.classes = data.items;
            }))
            .error(function () {
            });
    }

    function loadAll() {
        that.isLoading = true;
        $q.all(loadClasses(), that.loadReservation()).then(function (allData) {
            that.isLoading = false;
        });
    }

    loadAll();

    this.getPeopleForClass = function (classId) {
        var classFound = _.findWhere(that.classes, { Id: classId });
        return classFound != null ? classFound.People : [];
    };

    this.isPersonRegistered = function (personId, day) {
        if (personId == null) return false;
        return _.findWhere(day.People, { Id: personId }) != null;
    };

    this.isPersonRegisteredForWeekday = function (personId, weekDay) {
        return false;
    };

    this.remove = function (person, day) {
        if (confirm("Chcete opravdu zrušit rezervaci pro " + person.Name + "?")) {
            day.People = _.without(day.People, person);
        }
    };

    this.add = function (personId, classId, days) {
        var personFound = _.findWhere(that.getPeopleForClass(classId), { Id: that.filter.person });

        if (!personFound) {
            return;
        }

        _.each(days, function (day) {
            if (!that.isPersonRegistered(personId, day)) {
                day.People.push(personFound);
            }
        });
    };

    this.addToWeekDay = function (personId, classId, weekDay) {
        var days = getDays(weekDay);
        that.add(personId, classId, days);
    };

    function getDays(weekDay) {
        var index = weekDay.Order;
        var days = [];

        _.each(that.reservations.Weeks, function (week) {
            var day = week.Days[index];
            if (day) {
                days.push(day);
            }
        });

        return days;
    }

    this.getSelectedPersonName = function () {
        if (!that.filter.person || !that.filter.class) {
            return null;
        }

        var personFound = _.findWhere(that.getPeopleForClass(that.filter.class), { Id: that.filter.person });
        return personFound != null ? personFound.Name : null;
    };

    this.copyReservations = function () {
        alert('Kopírování rezervací není v demo verzi dostupné.');
    };

} ])