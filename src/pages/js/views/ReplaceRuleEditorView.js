var ReplaceRuleEditorView = BaseRuleEditorView.extend({

  Model: ReplaceRuleModel,

  id: 'replace-rule-editor',

  className: 'replace-rule-editor',

  getTemplate: function() {
    return RQ.Templates.ReplaceRuleEditor;
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair'
  })
});