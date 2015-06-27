describe('Requestly Background Service', function() {
  var redirectRule,
    cancelRule,
    headersRule;

  var URL_SOURCES = {
    GOOGLE: 'http://www.google.com',
    YAHOO: 'http://www.yahoo.com',
    FACEBOOK: 'http://www.facebook.com',
    GOOGLE_SEARCH_QUERY: 'https://www.google.co.in/search?q=',
    REQUESTLY: 'http://www.requestly.in'
  };

  var KEYWORDS = {
    GOOGLE: 'google',
    FACEBOOK: 'facebook'
  };

  afterEach(function() {
    redirectRule = null;
    cancelRule = null;
  });

  describe('Match Request Url method', function() {
    beforeEach(function() {
      redirectRule = new RedirectRuleModel({
        name: 'Redirect Test Rule',
        pairs: [
          {
            source: {
              key: RQ.RULE_KEYS.URL,
              operator: RQ.RULE_OPERATORS.EQUALS,
              value: URL_SOURCES.GOOGLE
            },
            destination: URL_SOURCES.YAHOO
          }
        ]
      });

      cancelRule = new CancelRuleModel({
        name: 'Cancel Rule',
        source: {
          key: RQ.RULE_KEYS.URL,
          operator: RQ.RULE_OPERATORS.CONTAINS,
          values: [ KEYWORDS.FACEBOOK ]
        }
      });
    });

    afterEach(function() {
      redirectRule = null;
      cancelRule = null;
    });

    it('should match Redirect Rule Source', function() {
      var pair = redirectRule.getPairs()[0],
        ruleType = redirectRule.getRuleType();

      // Equals Operator
      pair['destination'] = URL_SOURCES.YAHOO;
      expect(BG.Methods.matchUrlWithRuleSource(pair.source, pair.destination, URL_SOURCES.GOOGLE))
        .toBe(URL_SOURCES.YAHOO);

      pair['destination'] = URL_SOURCES.FACEBOOK;
      expect(BG.Methods.matchUrlWithRuleSource(pair.source, pair.destination, URL_SOURCES.GOOGLE))
        .toBe(URL_SOURCES.FACEBOOK);

      // Contains Operator
      pair['source']['operator'] = RQ.RULE_OPERATORS.CONTAINS;
      pair['source']['value'] = KEYWORDS.GOOGLE;
      expect(BG.Methods.matchUrlWithRuleSource(pair.source, pair.destination, URL_SOURCES.GOOGLE))
        .toBe(pair['destination']);

      // Matches Operator
      pair['source']['operator'] = RQ.RULE_OPERATORS.MATCHES;
      pair['source']['value'] = '/TGT-([0-9]+)/gi';
      pair['destination'] = URL_SOURCES.REQUESTLY + '?query=TGT-$1';

      expect(BG.Methods.matchUrlWithRuleSource(pair.source, pair.destination,
        URL_SOURCES.GOOGLE_SEARCH_QUERY + 'TGT-491')).toBe(URL_SOURCES.REQUESTLY + '?query=TGT-491');

      expect(BG.Methods.matchUrlWithRuleSource(pair.source, pair.destination,
        URL_SOURCES.GOOGLE_SEARCH_QUERY + 'TGT-10419')).toBe(URL_SOURCES.REQUESTLY + '?query=TGT-10419');
    });

    it('should return null when Cancel Rule Source does not match with Url', function() {
      var source = cancelRule.getSource(),
        ruleType = cancelRule.getRuleType(),
        destination = null;

      source.value = source.values[0];

      expect(BG.Methods.matchUrlWithRuleSource(source, destination, URL_SOURCES.GOOGLE)).toBeNull();
      expect(BG.Methods.matchUrlWithRuleSource(source, destination, URL_SOURCES.FACEBOOK)).not.toBeNull();
    });
  });

  describe('#modifyHeaders', function() {
    beforeEach(function() {
      headersRule = new HeadersRuleModel();

      var pair = headersRule.getPairs()[0];
      pair['header'] = 'User-Agent';
      pair['value'] = 'Mozilla/5.0';
      headersRule.setPair(0, pair);
    });

    afterEach(function() {
      headersRule = null;
      StorageService.records = [];
    });

    it('should return null when no header is modified', function() {
      StorageService.records.push(headersRule.toJSON());

      // Different Headers Target (Rule contains Request Headers)
      expect(BG.Methods.modifyHeaders([], RQ.HEADERS_TARGET.RESPONSE, { url: URL_SOURCES.FACEBOOK })).toBeNull();
    });

    it('should return null when there are no Active Rules', function() {
      headersRule.setStatus(RQ.RULE_STATUS.INACTIVE);

      StorageService.records.push(headersRule.toJSON());
      expect(BG.Methods.modifyHeaders([], RQ.HEADERS_TARGET.REQUEST, { url: URL_SOURCES.FACEBOOK })).toBeNull();
    });

    it('should return modified Headers Array when header is added', function() {
      StorageService.records.push(headersRule.toJSON());

      var modifiedheaders = BG.Methods.modifyHeaders([], RQ.HEADERS_TARGET.REQUEST, { url: URL_SOURCES.FACEBOOK });
      expect(modifiedheaders.length).toEqual(1);
    });

    it('should return modified Headers Array when header is removed', function() {
      var originalHeaders = [
        { name: 'Accept-Language', value: 'en-us'},
        { name: 'Host', value: 'example.com'},
        { name: 'User-Agent', value: 'Chrome'}
      ];

      var pair = headersRule.getPairs()[0];
      pair['type'] = RQ.MODIFICATION_TYPES.REMOVE;
      headersRule.setPair(0, pair);

      StorageService.records.push(headersRule.toJSON());
      var modifiedHeaders = BG.Methods.modifyHeaders(originalHeaders, RQ.HEADERS_TARGET.REQUEST, { url: URL_SOURCES.FACEBOOK });
      expect(modifiedHeaders.length).toEqual(2);
    });
  });
});