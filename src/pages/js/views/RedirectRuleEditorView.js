var RedirectRuleEditorView = BaseRuleEditorView.extend({
  Model: RedirectRuleModel,

  Mixins: [ RQ.Mixins.InputValidation ],

  id: 'redirect-rule-editor',

  className: 'rule-editor',

  getTemplate: function() {
    return RQ.Templates.RedirectRuleEditor;
  },

  getMarkup: function(template) {
    var ruleJson = RQ.TemplateHelpers.redirectRuleHelper(this.model.toJSON());
    return template(ruleJson);
  },

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'keyup .pair-container input': 'updateRulePair',
    'change .pair-container select': 'updateRulePair'
  }),

  isValidPair: function(pair) {
    var source = pair['source'],
      destinationField = pair['destination'];

    return this.validateSourceField(source.operator, source.value)
      && this.validateDestinationField(source.operator, destinationField);
  },

  alsoValidate: function() {
    var pairs = this.model.getPairs(),
      pairIndex,
      inValidPairIndex = -1,
      isValid;

    for (pairIndex = 0; pairIndex < pairs.length; pairIndex++) {
      isValid = this.isValidPair(pairs[pairIndex]);

      if (!isValid) {
        inValidPairIndex = pairIndex;
        return false;
      }
    }

    return true;
  },

  removeAdditionalFields: function() {
    var pairs = this.model.getPairs();

    _.each(pairs, function(pair) {
      delete pair['sourcePlaceholder'];
      delete pair['destinationPlaceholder'];
    });
  }
});