angular.module("NavetAppBg").service("BadgeService", function(BadgeDateFactory) {


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

  function writeBadgeText(seconds) {
    chrome.browserAction.setBadgeBackgroundColor({color: "#30486c"});
    chrome.browserAction.setBadgeText({
      text: BadgeDateFactory.getShortTime(seconds)
    });
  }

  function updateBadgeFromEvents(events) {
    writeBadgeText(getSecondsToNextEvent(events));
  }

  return {
    updateBadgeFromEvents: updateBadgeFromEvents
  }

});
