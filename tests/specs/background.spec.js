describe('Requestly Background Service', function() {
  var redirectRule,
    cancelRule,
    headersRule,
    replaceRule;

  var URL_SOURCES = {
    GOOGLE: 'http://www.google.com',
    YAHOO: 'http://www.yahoo.com',
    FACEBOOK: 'http://www.facebook.com',
    GOOGLE_SEARCH_QUERY: 'https://www.google.co.in/search?q=',
    REQUESTLY: 'http://www.requestly.in'
  };

  var KEYWORDS = {
    GOOGLE: 'google'
  };

  beforeEach(function() {
    redirectRule = new RedirectRuleModel({
      name: 'Redirect Test Rule',
      source: {
        key: RQ.RULE_KEYS.URL,
        operator: RQ.RULE_OPERATORS.EQUALS,
        values: [ URL_SOURCES.GOOGLE ]
      },
      destination: URL_SOURCES.YAHOO
    });
    cancelRule = new CancelRuleModel();
    headersRule = new HeadersRuleModel();
    replaceRule = new ReplaceRuleModel();
  });

  describe('Match Request Url method', function() {
    it('should match Redirect Rule Source', function() {
      // Equals Operator
      redirectRule.setDestination(URL_SOURCES.YAHOO);
      expect(BG.Methods.matchUrlWithRule(redirectRule.toJSON(), URL_SOURCES.GOOGLE)).toBe(URL_SOURCES.YAHOO);

      redirectRule.setDestination(URL_SOURCES.FACEBOOK);
      expect(BG.Methods.matchUrlWithRule(redirectRule.toJSON(), URL_SOURCES.GOOGLE)).toBe(URL_SOURCES.FACEBOOK);

      // Contains Operator
      redirectRule.setSourceOperator(RQ.RULE_OPERATORS.CONTAINS);
      redirectRule.setSourceValue(KEYWORDS.GOOGLE);
      expect(BG.Methods.matchUrlWithRule(redirectRule.toJSON(), URL_SOURCES.GOOGLE)).toBe(redirectRule.getDestination());

      // Matches Operator
      redirectRule.setSourceOperator(RQ.RULE_OPERATORS.MATCHES);
      redirectRule.setSourceValue('/TGT-([0-9]+)/gi');
      redirectRule.setDestination(URL_SOURCES.REQUESTLY + '?query=TGT-$1');

      expect(BG.Methods.matchUrlWithRule(redirectRule.toJSON(), URL_SOURCES.GOOGLE_SEARCH_QUERY + 'TGT-491'))
        .toBe(URL_SOURCES.REQUESTLY + '?query=TGT-491');
      expect(BG.Methods.matchUrlWithRule(redirectRule.toJSON(), URL_SOURCES.GOOGLE_SEARCH_QUERY + 'TGT-10419'))
        .toBe(URL_SOURCES.REQUESTLY + '?query=TGT-10419');
    });
  });
});