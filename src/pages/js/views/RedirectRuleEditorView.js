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
  },

  updateRuleSourceUrl: function(event) {
    var index = $(event.target).attr('data-index'),
      value = event.target.value;

    this.model.setSourceValue(value, Number(index));
  },

  updateRuleDestinationUrl: function(event) {
    this.model.setDestination(event.target.value);
  }
});