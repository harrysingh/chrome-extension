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
    'change .rule-operator-select': 'updateRuleOperator',
    'keyup .source-url-input': 'updateRuleSourceUrl',
    'keyup .destination-url-input': 'updateRuleDestinationUrl',
    'click #save-redirect-rule': 'saveRule'
  }),

  updateRuleOperator: function(event) {
    this.model.setSourceOperator(event.target.selectedOptions[0].value);
    this.render();
  },

  updateRuleSourceUrl: function(event) {
    var index = $(event.target).attr('data-index'),
      value = event.target.value;

    this.model.setSourceValue(value, Number(index));
  },

  updateRuleDestinationUrl: function(event) {
    this.model.setDestination(event.target.value);
  },

  alsoValidate: function() {
    var source = this.model.getSource(),
      destinationField = this.model.getDestination();

    return this.validateSourceField(source.operator, source.values[0]) &&
        this.validateDestinationField(source.operator, destinationField);
  }
});