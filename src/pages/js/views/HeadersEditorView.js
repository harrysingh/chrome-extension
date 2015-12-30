var HeadersEditorView = BaseRuleEditorView.extend({

  Model: HeadersRuleModel,

  getTemplate: function() {
    return RQ.Templates.HeadersRuleTemplate;
  },

  id: 'headers-rule-editor',

  className: 'rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair'
  }),

  hideMessage: function() {
    $(this.el).find('.message').hide();
  }
});