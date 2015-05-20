var ReplaceRuleEditorView = BaseRuleEditorView.extend({

  Model: ReplaceRuleModel,

  id: 'replace-rule-editor',

  getTemplate: function() {
    return RQ.Templates.REPLACE_RULE_EDITOR_TEMPLATE;
  },

  className: 'replace-rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair'
  })
});