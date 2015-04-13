navetApp.controller("PopupController", function($scope, $http) {

  $scope.title = "";
  $scope.loading = true;

  function getEvents() {
    $scope.title = "Loading events...";
    $scope.loading = true;

    $http.get("http://ifinavet.no/api/events")
      .success(function(data) {
        $scope.events = data.events;
        $scope.loading = false;
        var eventSize = data.events.length;

        if (eventSize == 0) {
          $scope.title = "No upcomming events";
        } else {
          $scope.title = "Showing " + eventSize + " events";
        }
      })
      .error(function(error) {
        $scope.loading = false;
        $scope.title = "Error loading events";
      });
  }

  $scope.reload = function() {
    getEvents();
  }


  $scope.moment = function getMoment(date) {
    return moment(date, "DD.MM.YYYY - hh:mm").fromNow();
  }

  getEvents();

});
