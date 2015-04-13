navetApp.controller("PopupController", function($scope, $http) {

  $scope.title = "WORKS!";
  $scope.error = false;

  $scope.reload = function() {
    getEvents();
  }

  function getEvents() {
    $scope.title = "Loading...";

    $http.get("http://ifinavet.no/api/events")
      .success(function(data) {
        $scope.events = data.events;
        $scope.error = false;
        $scope.title = data.events.length + " upcomming events";
      })
      .error(function(error) {
        $scope.error = true;
        $scope.title = "Error loading events";
      });
  }

  getEvents();

});
