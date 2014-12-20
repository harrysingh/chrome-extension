var BaseRuleEditorView = Backbone.View.extend({

  events: {
    'keyup .rule-name-input': 'updateRuleName',
    'change .rule-status-select': 'updateRuleStatus',
    'keyup .rule-description': 'updateRuleDescription',
    'click .save-rule': 'saveRule'
  },

  initialize: function(options) {
    options = options || {};
    this.model = new (options.model || this.Model);
  },

  render: function(options) {
    options = options || {};

    if (options.model && options.model instanceof Backbone.Model) {
      this.model = options.model;
    }

    /* If template is not passed as option,
    every editor view has to provide its own template by getTemplate method */
    this.template = options.template || this.getTemplate();

    var markup = _.template(this.template, { rule: this.model });
    $(this.el).html(markup);
  },

  updateRuleName: function(event) {
    this.model.setName(event.target.value);
  },

  updateRuleStatus: function(event) {
    this.model.setStatus(event.target.selectedOptions[0].value);
  },

  updateRuleDescription: function(event) {
    this.model.setDescription(event.target.value);
  },

  saveRule: function() {
    var ts = this.model.getTimestamp();

    // Set Creation date if not exists
    if (!this.model.hasCreationDate()) {
      this.model.setCreationDate(ts);
    }

    this.model.save({ callback: function() {
      RQ.router.navigate('', { trigger: true });
    }});
  }
});