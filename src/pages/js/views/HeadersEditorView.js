var HeadersEditorView = BaseRuleEditorView.extend({

  Model: HeadersRuleModel,

  getTemplate: function() {
    return RQ.Templates.HeadersRuleTemplate;
  },

  className: 'headers-rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair',
    'change .pair-container select': 'updateRulePair',
    'click .hide-message': 'hideMessage'
  }),

  hideMessage: function() {
    $(this.el).find('.message').hide();
  }
});