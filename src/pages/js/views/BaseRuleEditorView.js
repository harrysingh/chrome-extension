var BaseRuleEditorView = Backbone.View.extend({

  events: {
    'keyup .rule-name-input': 'updateRuleName',
    'change .rule-status-select': 'updateRuleStatus',
    'keyup .rule-description': 'updateRuleDescription',
    'click .add-pair': 'addPair',
    'click .delete-pair': 'deletePair',
    'click .save-rule': 'saveRule'
  },

  Mixins: [],

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

  loadMixin: function(mixin) {
    _.extend(this, mixin);
  },

  loadMixins: function(mixins) {
    _.each(mixins, this.loadMixin, this);
  },

  initialize: function(options) {
    options = options || {};
    this.loadModel(options.model);
    this.loadMixins(this.Mixins);
  },

  getMarkup: function(template) {
    return _.template(template, { rule: this.model });
  },

  render: function(options) {
    options = options || {};

    // Load the passed model and use it to render the view
    if (options.model) {
      this.loadModel(options.model);
    }

    /* If template is not passed as option,
    every editor view has to provide its own template by getTemplate method */
    this.template = options.template || this.getTemplate();

    var markup = this.getMarkup(this.template);
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

  addPair: function(event) {
    var newPair = this.model.getDefaultPair(),
      pairs = this.model.getPairs();

    pairs.push(newPair);
    this.render();
  },

  deletePair: function(event) {
    var $target = $(event.target),
      pairIndex = Number($target.parents('.pair-container').attr('data-index')),
      pairs = this.model.getPairs();

    pairs.splice(pairIndex, 1);
    this.render();
  },

  /**
   * If key is complex, e.g source.operator then drill down to leaf node and add the value to corresponding key
   *
   * @param pair
   * @param key
   * @param value
   * @returns Updated pair
   */
  updateFieldInPair: function(pair, key, value) {
    var nestedKeys = key.split('.'),
      index,
      currentNode = pair;

    // Reach the leaf node
    for (index = 0; index < nestedKeys.length - 1; index++) {
      currentNode = currentNode[ nestedKeys[index] ];
    }

    // Finally Set the value once we reach the leaf node
    currentNode[ nestedKeys[index] ] = value;

    return pair;
  },

  updateRulePair: function(event) {
    var $target = $(event.target),
      index = Number($target.parents('.pair-container').attr('data-index')),
      key = $target.attr('data-key'),
      pairs = this.model.getPairs();

    if (event.target.tagName === 'INPUT') {
      this.updateFieldInPair(pairs[index], key, event.target.value);
    }

    if (event.target.tagName === 'SELECT') {
      this.updateFieldInPair(pairs[index], key, event.target.selectedOptions[0].value);
      this.render();
    }
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