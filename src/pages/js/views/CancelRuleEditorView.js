var CancelRuleEditorView = RedirectRuleEditorView.extend({

  Model: CancelRuleModel,

  id: 'cancel-rule-editor',

  className: 'rule-editor',

  getTemplate: function() {
    return RQ.Templates.CancelRuleEditor;
  },

  isValidPair: function(pair) {
    var source = pair['source'];

    return this.validateSourceField(source.operator, source.value);
  },

  removeAdditionalFields: function() {
    var pairs = this.model.getPairs();

    _.each(pairs, function(pair) {
      delete pair['sourcePlaceholder'];
      delete pair['destinationPlaceholder'];
      delete pair['destination'];
    });
  }
});