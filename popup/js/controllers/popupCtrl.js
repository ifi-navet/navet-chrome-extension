angular.module("NavetApp").controller("PopupController", function($scope, $timeout) {

  var status = {
    authError: false,
    loading: false,
    title: ""
  };

  $scope.status = status;

  function setEvents(events) {
    $scope.events = events;

    if (!events || events.length == 0) {
      status.title = "No upcomming events";
    } else {
      status.title = "Showing " + events.length + " events";
    }
  }

  function getEvents() {
    var events = window.getEvents();
    if (!events) {
      fetchEvents();
    } else {
      setEvents(events);
    }
  }

  function fetchEvents() {
    status.title = "Loading...";
    status.loading = true;

    window.fetchEvents(
      function(data) {
        status.loading = false;
        status.authError = false;
        setEvents(data.events);
        // Async call, must call $apply to update bindings
        $scope.$apply();
      },
      function(error, statusCode) {
        status.title = "Error loading events";
        status.loading = false;
        status.authError = statusCode == 401;

        // Async call, must call $apply to update bindings
        $scope.$apply();

      });
  }

  $scope.reload = function() {
    fetchEvents();
  }

  $scope.moment = function(date) {
    return moment(date, "DD.MM.YYYY - hh:mm").fromNow();
  }

  // Events can be overbooked
  $scope.availableSpots = function(event) {
    var available = event.limit - event.attending;
    if (available < 0)
      return 0;

    return available;
  }

  getEvents();

});
