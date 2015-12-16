var RQ = RQ || {};
RQ.Utils = RQ.Utils || {};

RQ.Utils.regexFormat = '^\/(.+)\/(|i|g|ig|gi)$';

RQ.Utils.isValidRegex = function(regexStr) {
  return regexStr.search(new RegExp(RQ.Utils.regexFormat)) !== -1;
};

RQ.Utils.toRegex = function(regexStr) {
  var isRegexStringValid = this.isValidRegex(regexStr),
    matchRegExp;

  if (!isRegexStringValid) {
    return null;
  }
  matchRegExp = regexStr.match(new RegExp(RQ.Utils.regexFormat));

  return new RegExp(matchRegExp[1], matchRegExp[2]);
};

RQ.Utils.isValidUrl = function(url) {
  return url.search(/^http:|https:|ftp:|javascript:/) === 0;
};

RQ.Utils.submitEvent = function(category, action, label) {
  var eventObserverPlaceholder = document.getElementById('events-observer-placeholder'),
    $eventEl = $('<span></span>').attr({
      'data-category': category,
      'data-action': action,
      'data-label': label
    });

  eventObserverPlaceholder.appendChild($eventEl.get(0));
};

RQ.Utils.sleep = function(numSeconds) {
  var initialTimeStamp = Date.now();
  while (Date.now() < (initialTimeStamp + numSeconds * 1000)) {
    // No-Op
  }

  return 0;
};
