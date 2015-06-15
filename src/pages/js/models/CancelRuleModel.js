/**
 * Cancel Rule is a special type of Redirect Rule where destination is falsy (null | undefined | notset | '')
 */
var CancelRuleModel = RedirectRuleModel.extend({
  defaults: function() {
    return _.extend(RedirectRuleModel.prototype.defaults(), {
      ruleType: RQ.RULE_TYPES.CANCEL
    });
  },

  isDeprecatedFormat: function() {
    return typeof this.get('source') !== 'undefined';
  }
});