var RedirectRuleEditorView = BaseRuleEditorView.extend({
  Model: RedirectRuleModel,

  getTemplate: function() {
    return RQ.Templates.REDIRECT_RULE_EDITOR_TEMPLATE;
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'change .rule-operator-select': 'updateRuleOperator',
    'keyup .source-url-input': 'updateRuleSourceUrl',
    'keyup .destination-url-input': 'updateRuleDestinationUrl',
    'click #save-redirect-rule': 'saveRule'
  }),

  updateRuleOperator: function(event) {
    this.model.setSourceOperator(event.target.selectedOptions[0].value);
    this.render();
  },

  updateRuleSourceUrl: function(event) {
    var index = $(event.target).attr('data-index'),
      value = event.target.value;

    this.model.setSourceValue(value, Number(index));
  },

  updateRuleDestinationUrl: function(event) {
    this.model.setDestination(event.target.value);
  },

  alsoValidate: function() {
    var source = this.model.getSource(),
      operator = source.operator,
      value = source.values[0];

    if (operator === RQ.RULE_OPERATORS.MATCHES && !RQ.Utils.isValidRegex(value)) {
      Backbone.trigger('notification', {
        className: 'rq-error',
        message: 'Error: "' + value + '" is not a valid regular expression'
      });
      return false;
    }

    return true;
  }
});