var RuleIndexView = Backbone.View.extend({

  events: {
    'click .ruleName': 'showRuleEditor',
    'change .status-toggle': 'toggleStatus',
    'click .delete-rule-icon': 'deleteRule',
    'click .select-all-rules-checkbox': 'selectAllRules',
    'click .select-rule-checkbox': 'selectRule',
    'click .export-rules-button': 'exportRules',
    'click .import-rules-button': 'importRules'
  },

  initialize: function() {
    this.rulesCollection = new RulesCollection();

    // We don't need to listen on add event because rule is always created from editor
    // And on route change we always fetch the latest rules from DB
    this.listenTo(this.rulesCollection, 'loaded', this.render);
    this.listenTo(this.rulesCollection, 'change', this.render);
    this.listenTo(this.rulesCollection, 'remove', this.render);
    this.listenTo(this.rulesCollection, 'add', this.render);
  },

  updateCollection: function() {
    this.rulesCollection.fetchRules();
  },

  getTemplate: function() {
    return RQ.Templates.RuleIndex;
  },

  getMarkup: function(template) {
    return template({ rules: this.rulesCollection.toJSON() });
  },

  render: function(options) {
    var markup,
      $el = $(this.el);

    options = options || {};

    if (options && options.update) {
      // updateCollection will trigger 'loaded' event which will render the view
      this.updateCollection();
    } else {
      this.template = this.getTemplate();

      markup = this.getMarkup(this.template);
      $el.html(markup);
    }

    $el.find('.status-toggle').bootstrapToggle();
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
    var $ruleItemRow = $(event.currentTarget).parents('.rule-item-row'),
      ruleModel = this.rulesCollection.get($ruleItemRow.data('id')),
      ruleName = ruleModel.getName(),
      eventAction,
      ruleStatus;

    if (ruleModel.getStatus() === RQ.RULE_STATUS.ACTIVE) {
      ruleModel.setStatus(RQ.RULE_STATUS.INACTIVE);
      eventAction = RQ.GA_EVENTS.ACTIONS.DEACTIVATED;
    } else {
      ruleModel.setStatus(RQ.RULE_STATUS.ACTIVE);
      eventAction = RQ.GA_EVENTS.ACTIONS.ACTIVATED;
    }

    ruleStatus = ruleModel.getStatus();

    ruleModel.save({
      callback: function() {
        Backbone.trigger('notification', {
          className: 'rq-info',
          message: ruleName + ' is now ' + ruleStatus
        });

        // Commenting due to #95 Event passing strategy Improvement for analytics tracking
        //RQ.Utils.submitEvent('rule', eventAction, ruleModel.getRuleType().toLowerCase() + ' rule ' + eventAction);
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

          // Commenting due to #95 Event passing strategy Improvement for analytics tracking
          //RQ.Utils.submitEvent(
          // 'rule',
          // RQ.GA_EVENTS.ACTIONS.DELETED,
          // ruleModel.getRuleType().toLowerCase() + ' rule ' + RQ.GA_EVENTS.ACTIONS.DELETED
          // );
        }
      });
    }

    return false;
  },

  selectAllRules: function(event) {
    var isChecked = $(event.currentTarget).is(':checked');
    $('.select-rule-checkbox').prop('checked', isChecked);
    $('.rule-item-row').toggleClass('selected', isChecked);
  },

  selectRule: function(event) {
    var $checkbox = $(event.currentTarget),
      isChecked = $checkbox.is(':checked');

    if (!isChecked) {
      $('.select-all-rules-checkbox').prop('checked', false);
    }
    $checkbox.closest('.rule-item-row').toggleClass('selected', isChecked);
  },

  getSelectedRules: function() {
    var $selectedRows = $('.select-rule-checkbox:checked').closest('.rule-item-row'),
      rules = [];

    _.each($selectedRows, function(row) {
      rules.push(this.getRuleFromRow(row));
    }, this);

    return rules;
  },

  getRuleFromRow: function(row) {
    var $row = $(row),
      ruleId = $row.data('id');

    return this.rulesCollection.get(ruleId);
  },

  exportRules: function() {
    var selectedRules = this.getSelectedRules(),
      rules = selectedRules.length ? selectedRules : this.rulesCollection.models;

    var rulesAttributes = _.pluck(rules, 'attributes');
    Backbone.trigger('file:save', JSON.stringify(rulesAttributes), 'requestly_rules');

    // Commenting due to #95 Event passing strategy Improvement for analytics tracking
    //RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.EXPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.EXPORTED);
  },

  importRules: function() {
    var that = this;

    Backbone.trigger('file:load', function(data) {
      var rules = JSON.parse(data);
      _.each(rules, function(rule) {
        var ruleModel = new BaseRuleModel(rule);
        // The rule being added might have updated metadata, so remove a rule if present with same id.
        that.rulesCollection.remove(ruleModel, { silent: true });
        that.rulesCollection.add(ruleModel);
        ruleModel.save();
      });

      // Commenting due to #95 Event passing strategy Improvement for analytics tracking
      //RQ.Utils.submitEvent('rules', RQ.GA_EVENTS.ACTIONS.IMPORTED, 'Rules ' + RQ.GA_EVENTS.ACTIONS.IMPORTED);
    });
  }
});