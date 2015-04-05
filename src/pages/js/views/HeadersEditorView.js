var HeadersEditorView = BaseRuleEditorView.extend({

  Model: HeadersRuleModel,

  getTemplate: function() {
    return RQ.Templates.HEADERS_EDITOR_TEMPLATE;
  },

  className: 'headers-rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'click .add-pair': 'addPair',
    'click .delete-pair': 'deletePair',
    'keyup .pair-container input': 'updateRulePair',
    'change .pair-container select': 'updateRulePair',
    'click .hide-message': 'hideMessage'
  }),

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
   * If key is complex, e.g source.operator then drill down to final object and add the value to corresponding key
   *
   * @param pair
   * @param key
   * @param value
   * @returns Updated pair
   */
  updateFieldInPair: function(pair, key, value) {
    var nestedKeys = key.split('.'),
      nestedObject = pair;

    for (var index = 0; index < nestedKeys.length - 1; index++) {
      nestedObject = pair[nestedKeys[index]];
    }

    nestedObject[nestedKeys[index]] = value;

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

  hideMessage: function() {
    $(this.el).find('.message').hide();
  }
});