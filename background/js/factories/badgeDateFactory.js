angular.module("NavetAppBg").factory("BadgeDateFactory", function() {

  var timeSizes = {
    "now":     { text: "NOW", size: 0 },
    "minutes": { text: "m", size: 60 },
    "hours":   { text: "h", size: 60*60 },
    "days":    { text: "d", size: 60*60*24 },
    "weeks":   { text: "w", size: 60*60*24*7 },
    "months":  { text: "M", size: 60*60*24*30 },
    "years":   { text: "y", size: 60*60*24*356 }
  }

  // Descending order
  var enabledSizes = ["weeks", "days", "hours", "minutes", "now"];

  function getShortTime(seconds) {
    if (seconds < 0)
      return "";

    for (var i = 0; i < enabledSizes.length; i++) {
      var time = enabledSizes[i];
      var size = timeSizes[time];

      if (timeSizes[time].size === 0) {
        return timeSizes[time].text;
      }

      if (seconds / size.size >= 1) {
        return Math.round(seconds/size.size) + size.text;
      }
    }

    return "";
  }

  return {
    getShortTime : getShortTime
  }

});
