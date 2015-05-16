var RedirectRuleModel = BaseRuleModel.extend({
  defaults: function() {
    return _.extend(BaseRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.REDIRECT,
      pairs: [
        this.getDefaultPair()
      ]
    });
  },

  getDefaultPair: function() {
    return {
      source: {
        key: RQ.RULE_KEYS.URL,
        operator: RQ.RULE_OPERATORS.CONTAINS,
        value: ''
      },
      destination: ''
    }
  },

  introducePairs: function () {
    var pairs = this.getPairs(),
      defaultPair,
      sourceObject = this.get('source'),
      destination = this.get('destination');

    // Add Pair if Redirect Rule contains Source and Destination instead of pair
    if (typeof sourceObject !== 'undefined' && typeof destination !== 'undefined') {
      defaultPair = this.getDefaultPair();
      defaultPair['source']['value'] = sourceObject['values'][0];
      defaultPair['source']['operator'] = sourceObject['operator'];
      defaultPair['destination'] = destination;

      this.set('pairs', [ defaultPair ]);
      this.unset('source');
      this.unset('destination');
    }
  },

  /**
   * Transform Attributes to support multiple entries in Single Redirect Rule
   * Wiki: https://github.com/blunderboy/requestly/wiki/Format-of-different-Rule-Types
   */
  transformAttributes: function() {
    this.introducePairs();
  }
});