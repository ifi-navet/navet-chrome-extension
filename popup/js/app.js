var bgPage = chrome.extension.getBackgroundPage();

window.getEvents = bgPage.getEvents;
window.fetchEvents = bgPage.fetchEvents;

angular.module("NavetApp", []);
