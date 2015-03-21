var BaseRuleEditorView = Backbone.View.extend({

  events: {
    'keyup .rule-name-input': 'updateRuleName',
    'change .rule-status-select': 'updateRuleStatus',
    'keyup .rule-description': 'updateRuleDescription',
    'click .save-rule': 'saveRule'
  },

  /**
   * loadModel: loads model and binds to the view
   * @param model Backbone Model instance or just a backbone model
   */
  loadModel: function(model) {
    if (model) {
      this.model = (model instanceof Backbone.Model) ? model : new model;
    } else {
      this.model = new this.Model;
    }
  },

  initialize: function(options) {
    options = options || {};
    this.loadModel(options.model);
  },

  render: function(options) {
    options = options || {};
    this.loadModel(options.model);

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

  // No-Op
  // To be over-ridden by inherited editor to support any additional validation
  alsoValidate: function() { return true; },

  validateRule: function() {
    var ruleName = this.model.getName();

    if (!ruleName) {
      Backbone.trigger('notification', {
        className: 'rq-error',
        message: 'Error: Rule Name can not be empty'
      });

      return false;
    }

    return this.alsoValidate();
  },

  saveRule: function() {
    var ts = this.model.getTimestamp(),
      ruleName = this.model.getName();

    // Set Creation date if not exists
    if (!this.model.hasCreationDate()) {
      this.model.setCreationDate(ts);
    }

    if (!this.validateRule()) {
      return false;
    }

    this.model.save({ callback: function() {
      RQ.router.navigate('', { trigger: true });
      Backbone.trigger('notification', {
        className: 'rq-success',
        message: ruleName + ' has been saved successfully!!'
      });

      // #34: User needs to refresh the page whenever rule status is changed
      setTimeout(function() {
        window.location.reload();
      }, 2000 );
    }});
  }
});