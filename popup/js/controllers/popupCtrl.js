angular.module("NavetApp").controller("PopupController", function($scope, $http, EventService) {

  $scope.title = "";
  $scope.loading = true;
  $scope.authError = false;

  function getEvents() {
    $scope.title = "Loading...";
    $scope.loading = true;

    EventService.getUpcommingEvents(
      function(data) {
        $scope.events = data.events;
        $scope.loading = false;
        var eventSize = data.events.length;

        if (eventSize == 0) {
          $scope.title = "No upcomming events";
        } else {
          $scope.title = "Showing " + eventSize + " events";
        }
      },
      function(error, status) {
        $scope.loading = false;
        $scope.title = "Error loading events";
        $scope.authError = status == 401;
      });
  }

  $scope.reload = function() {
    getEvents();
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
