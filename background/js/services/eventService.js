angular.module("NavetAppBg").service("EventService", function($http) {

  function getUpcommingEvents(success, error) {
    return $http.get("http://ifinavet.no/api/events")
      .success(success)
      .error(error);
  }

  return {
    getUpcommingEvents: getUpcommingEvents
  }

});
