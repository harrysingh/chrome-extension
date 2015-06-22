var RuleIndexView = Backbone.View.extend({

  Template: function() {
    return RQ.Templates.RULE_INDEX_TEMPLATE;
  },

  events: {
    'click .ruleName': 'showRuleEditor',
    'click .toggle-status-icon': 'toggleStatus',
    'click .delete-rule-icon': 'deleteRule',
    'click .select-all-rules': 'selectAllRules',
    'click .select-rule': 'selectRule',
    'click .btn-export': 'exportAllRules',
    'click .btn-import': 'importAllRules'
  },

  initialize: function() {
    this.rulesCollection = new RulesCollection();

    // We don't need to listen on add event because rule is always created from editor
    // And on route change we always fetch the latest rules from DB
    this.listenTo(this.rulesCollection, 'loaded', this.render);
    this.listenTo(this.rulesCollection, 'change', this.render);
    this.listenTo(this.rulesCollection, 'remove', this.render);
  },

  updateCollection: function() {
    this.rulesCollection.fetchRules();
  },

  render: function(options) {
    if (options && options.update) {
      // updateCollection will trigger 'loaded' event which will render the view
      this.updateCollection();
    } else {
      var markup = _.template(this.Template(), { rules: this.rulesCollection.models });
      this.$el.html(markup);
    }
  },

  showRuleEditor: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      id = $ruleItemRow.data('id');

    RQ.router.navigate('/edit/' + id, { trigger: true });
  },

  reloadPage: function(wait) {
    wait = wait || 0;

    setTimeout(function() {
      window.location.reload();
    }, wait);
  },

  toggleStatus: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id')),
      ruleName = ruleModel.getName(),
      ruleStatus,
      that = this;

    if (ruleModel.getStatus() === RQ.RULE_STATUS.ACTIVE) {
      ruleModel.setStatus(RQ.RULE_STATUS.INACTIVE);
    } else {
      ruleModel.setStatus(RQ.RULE_STATUS.ACTIVE);
    }

    ruleStatus = ruleModel.getStatus();

    ruleModel.save({
      callback: function() {
        Backbone.trigger('notification', {
          className: 'rq-info',
          message: ruleName + ' is now ' + ruleStatus
        });

        // #34: User needs to refresh the page whenever rule status is changed
        that.reloadPage(2000);
      }
    });
    return false;
  },

  deleteRule: function(event) {
    var $ruleItemRow = $(event.target).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id')),
      ruleName = ruleModel.getName(),
      that = this;

    if (window.confirm(RQ.MESSAGES.DELETE_RULE)) {
      that.rulesCollection.remove(ruleModel);
      ruleModel.remove({
        callback: function() {
          Backbone.trigger('notification', {
            className: 'rq-success',
            message: ruleName + ' has been deleted successfully!!'
          });

          // #34: User needs to refresh the page whenever rule is changed
          that.reloadPage(2000);
        }
      });
    }

    return false;
  },

  selectAllRules: function(event) {
    var isChecked = $(event.currentTarget).is(':checked');
    $('.select-rule').prop('checked', isChecked);
  },

  selectRule: function(event) {
    var isChecked = $(event.currentTarget).is(':checked');
    if (!isChecked) {
      $('.select-all-rules').prop('checked', false);
    }
  },

  getSelectedRules: function() {
    var $selectedRows = $('.select-rule:checked').closest('.rule-item-row'),
      rules = [];

    _.each($selectedRows, function(row) {
      rules.push(this.getRuleFromRow(row));
    }, this);

    return rules;
  },

  getRuleFromRow: function(row) {
    var $row = $(row),
      id = $row.data('id');

    return this.rulesCollection.get(id);
  },

  exportAllRules: function() {
    var rules = _.pluck(this.getSelectedRules(), 'attributes');
    Backbone.trigger('file:save', JSON.stringify(rules), 'requestly_rules');
  },

  importAllRules: function() {
    var that = this;

    Backbone.trigger('file:load', function(data) {
      var rules = JSON.parse(data);
      _.each(rules, function(rule) {
        var ruleModel = new BaseRuleModel(rule);
        ruleModel.save();
      });
      that.reloadPage();
    });
  }
});