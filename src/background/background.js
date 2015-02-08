var BG = {
  Methods: {}
};

BG.Methods.setupRules = function() {
  BG.Methods.registerListeners();
};

BG.Methods.matchUrlWithRule = function(rule, url) {
  var source = rule.source,
    operator = source.operator,
    value;

  for (var i = 0; i < source.values.length; i++) {
    value = source.values[i];

    if (operator === RQ.RULE_OPERATORS.EQUALS && value === url) {
      return true;
    }

    if (operator === RQ.RULE_OPERATORS.CONTAINS && url.indexOf(value) !== -1) {
      return true;
    }

    if (operator === RQ.RULE_OPERATORS.MATCHES) {
      var regex = RQ.Utils.toRegex(value),
        matches,
        destinationUrl = rule.destination;

      // Do not redirect when regex is invalid or regex does not match with Url
      if (!regex || url.search(regex) === -1) {
        return false;
      }

      matches = regex.exec(url) || [];

      matches.forEach(function(matchValue, index) {
        // First match is the full string followed by parentheses/group values
        if (index === 0 || !matchValue) {
          return;
        }

        // Replace all $index values in destinationUrl with the matched groups
        destinationUrl = destinationUrl.replace(new RegExp('[\$]' + index, 'g'), matchValue);
      });

      rule.destination = destinationUrl;
      return true;
    }
  }

  return false;
};

BG.Methods.matchUrlWithReplaceRulePairs = function(rule, url) {
  var pairs = rule.pairs,
    pair = null,
    from = null,
    resultingUrl = null;

  for (var i = 0; i < pairs.length; i++) {
    pair = pairs[i];
    pair.from = pair.from || '';

    // When string pair.from looks like a RegExp, create a RegExp object from it
    from = RQ.Utils.toRegex(pair.from) || pair.from;

    if (url.match(from)) {
      resultingUrl = url.replace(from, pair.to);
      break;
    }
  }

  return resultingUrl;
};

BG.Methods.removeHeader = function(headers, name) {
  for (var i = headers.length - 1; i >= 0; i--) {
    if (headers[i].name.toLowerCase() === name.toLowerCase()) {
      headers.splice(i, 1);
      break;
    }
  }
};

BG.Methods.modifyHeaderIfExists = function(headers, newHeader) {
  for (var i = headers.length - 1; i >= 0; i--) {
    if (headers[i].name.toLowerCase() === newHeader.name.toLowerCase()) {
      headers[i].value = newHeader.value;
      break;
    }
  }
};

BG.Methods.modifyHeaders = function(originalHeaders, headersTarget) {
  var rule,
    headerPairs,
    modification;

  for (var i = 0; i < StorageService.records.length; i++) {
    rule = StorageService.records[i];

    if (rule.status !== RQ.RULE_STATUS.ACTIVE || rule.ruleType !== RQ.RULE_TYPES.HEADERS) {
      continue;
    }

    headerPairs = rule.pairs || [];

    for (var headerIndex = 0; headerIndex < headerPairs.length; headerIndex++) {
      modification = headerPairs[headerIndex];

      if (modification.target !== headersTarget || !modification.header) {
        continue;
      }

      switch (modification.type) {
        case RQ.MODIFICATION_TYPES.ADD:
          originalHeaders.push({name: modification.header, value: modification.value});
          break;

        case RQ.MODIFICATION_TYPES.REMOVE:
          BG.Methods.removeHeader(originalHeaders, modification.header);
          break;

        case RQ.MODIFICATION_TYPES.MODIFY:
          BG.Methods.modifyHeaderIfExists(originalHeaders, {
            name: modification.header,
            value: modification.value
          });
      }
    }
  }

  return originalHeaders;
};

BG.Methods.modifyUrl = function(details) {
  for (var i = 0; i < StorageService.records.length; i++) {
    var rule = StorageService.records[i];

    if (rule.status !== RQ.RULE_STATUS.ACTIVE) {
      continue;
    }

    switch(rule.ruleType) {
      case RQ.RULE_TYPES.REDIRECT:
        if (BG.Methods.matchUrlWithRule(rule, details.url)) {
          return { redirectUrl: rule.destination };
        }
        break;

      /**
      * In case of Cancel Request, destination url is 'javascript:'
      */
      case RQ.RULE_TYPES.CANCEL:
        if (BG.Methods.matchUrlWithRule(rule, details.url)) {
          return { redirectUrl: 'javascript:' };
        }
        break;

      case RQ.RULE_TYPES.REPLACE:
        var resultingUrl = BG.Methods.matchUrlWithReplaceRulePairs(rule, details.url);
        if (resultingUrl !== null) {
          return { redirectUrl: resultingUrl };
        }
        break;
    }
  }
};

BG.Methods.registerListeners = function() {
  chrome.webRequest.onBeforeRequest.addListener(
    BG.Methods.modifyUrl, { urls: ['<all_urls>'] }, ['blocking']
  );

  chrome.webRequest.onBeforeSendHeaders.addListener(function(details) {
    var modifiedHeaders = BG.Methods.modifyHeaders(details.requestHeaders, RQ.HEADERS_TARGET.REQUEST);
    return { requestHeaders: modifiedHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']);

  chrome.webRequest.onHeadersReceived.addListener(function(details) {
    var modifiedHeaders = BG.Methods.modifyHeaders(details.responseHeaders, RQ.HEADERS_TARGET.RESPONSE);
    /*
    if (details.url == 'https://developer.chrome.com/extensions/webRequest') {
      console.log('sachin');
    }*/
    return { responseHeaders: modifiedHeaders };
  },
  { urls: ['<all_urls>'] },
  ['blocking', 'responseHeaders']);
};

chrome.browserAction.onClicked.addListener(function () {
  chrome.tabs.create({'url': chrome.extension.getURL('src/pages/index.html')}, function(tab) {
    // Tab opened.
  });
});

StorageService.getRecords({ callback: BG.Methods.setupRules });
