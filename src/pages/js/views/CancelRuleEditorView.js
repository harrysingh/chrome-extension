var CancelRuleEditorView = BaseRuleEditorView.extend({

  Model: CancelRuleModel,

  getTemplate: function() {
    return RQ.Templates.CANCEL_RULE_EDITOR_TEMPLATE;
  },

  className: 'cancel-rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'change .rule-operator-select': 'updateRuleOperator',
    'keyup .source-url-input': 'updateRuleSourceUrl'
  }),

  updateRuleOperator: function(event) {
    this.model.setSourceOperator(event.target.selectedOptions[0].value);
  },

  updateRuleSourceUrl: function(event) {
    var index = $(event.target).attr('data-index'),
      value = event.target.value;

    this.model.setSourceValue(value, Number(index));
  }
});