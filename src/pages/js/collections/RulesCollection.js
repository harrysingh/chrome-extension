var RulesCollection = Backbone.Collection.extend({
  model: BaseRuleModel,

  fetchRules: function(options) {
    var that = this;
    options = options || {};

    RQ.StorageService.getRecords({
      forceFetch: true,
      callback: function(rules) {
        that.models.length = 0;

        _.each(rules, function(ruleObject) {
          var model = new that.model(ruleObject);
          that.add(model);
        });

        if (typeof options.success === 'function') {
          options.success(that);
        }

        that.trigger('loaded');
      }
    });
  },

  comparator: function(model) {
    // By default rules should be sorted by timestamp in decreasing order
    // Latest rule should come on top
    return -1 * model.getTimestampFromId();
  }
});