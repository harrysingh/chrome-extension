var CancelRuleEditorView = RedirectRuleEditorView.extend({

  Model: CancelRuleModel,

  Mixins: [ RQ.Mixins.InputValidation ],

  id: 'cancel-rule-editor',

  getTemplate: function() {
    return RQ.Templates.CancelRuleEditor;
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair',
    'change .pair-container select': 'updateRulePair'
  }),

  removeAdditionalFields: function() {
    var pairs = this.model.getPairs();

    _.each(pairs, function(pair) {
      delete pair['sourcePlaceholder'];
      delete pair['destinationPlaceholder'];
      delete pair['destination'];
    });
  }
});