var RedirectRuleEditorView = BaseRuleEditorView.extend({
  Model: RedirectRuleModel,

  Mixins: [ RQ.Mixins.InputValidation ],

  id: 'redirect-rule-editor',

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

  alsoValidate: function() {
    return true;
    /*
    var source = this.model.getSource(),
      destinationField = this.model.getDestination();

    return this.validateSourceField(source.operator, source.values[0]) &&
        this.validateDestinationField(source.operator, destinationField);      */
  }
});