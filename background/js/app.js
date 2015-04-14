var EVENT_ALARM = "event_refresh";

var counter = 0;
var bgApp = angular.module("NavetAppBg", []);

bgApp.run(function(EventService, BadgeService) {
  var events;

  function updateEvents(success, error) {
    EventService.getUpcommingEvents(
      function(data) {
        events = data.events;
        BadgeService.updateBadgeFromEvents(events);

        if (!!success)
          success(data);
      },
      function(err, status) {
        events = null;
        BadgeService.updateBadgeFromEvents(events);

        if (!!error)
          error(err, status);
      });
  }

  function getEvents() {
    return events;
  }

  BadgeService.updateBadgeFromEvents();
  /* Clear any unwanted events */
  chrome.alarms.clearAll();
  /* Create a periodic event that happens every N minutes */
  chrome.alarms.create(EVENT_ALARM, {periodInMinutes: 5});

  chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === EVENT_ALARM) {
      updateEvents();
    }
  });

  window.getEvents = getEvents;
  window.fetchEvents = updateEvents;

  updateEvents();
});
