var HeadersRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.HEADERS,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      type: RQ.MODIFICATION_TYPES.ADD,
      target: RQ.HEADERS_TARGET.REQUEST,
      header: '',
      value: '',
      source: this.getDefaultSource()
    };
  },

  getDefaultSource: function() {
    return {
      key: RQ.RULE_KEYS.URL,
      operator: RQ.RULE_OPERATORS.EQUALS,
      value: ''
    };
  },

  /**
   * Adds default Source to rule pairs whenever not present
   * @returns {boolean} true if Source is added to any of the pairs
   */
  insertDefaultSourceInPairs: function() {
    var pairs = this.getPairs(),
      isSourceAdded = false;

    _.each(pairs, function(pair) {
      if (typeof pair.source === 'undefined') {
        pair.source = this.getDefaultSource();
        isSourceAdded = true;
      }
    }, this);

    return isSourceAdded;
  },

  transformAttributes: function() {
    this.insertDefaultSourceInPairs();
  }
});