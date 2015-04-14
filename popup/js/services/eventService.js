angular.module("NavetApp").service("EventService", function($http, BadgeDateFactory) {

  var alarmName = "event_refresh";

  function writeBadgeText(seconds) {
    chrome.browserAction.setBadgeBackgroundColor({color: "#30486c"});
    chrome.browserAction.setBadgeText({
      text: BadgeDateFactory.getShortTime(seconds)
    });
  }

  function getSecondsToNextEvent(events) {
    if (!!events && events.length > 0) {
      var now = Date.now()/1000;

      for (var i = 0; i < events.length; i++) {
        var eDate = moment(events[i].date, "DD.MM.YYYY - hh:mm").unix();
        if (eDate - now > 0) {
          return Math.floor(eDate - now);
        }
      }
    }

    return -1;
  }

  function getUpcommingEvents(success, error) {

    return $http.get("http://ifinavet.no/api/events")
      .success(function(data) {
        var seconds = getSecondsToNextEvent(data.events);
        writeBadgeText(seconds);

        if (!!success)
          success(data);
      })
      .error(error);
  }

  return {
    getUpcommingEvents: getUpcommingEvents
  }

});
