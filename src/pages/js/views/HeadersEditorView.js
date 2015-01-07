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

  updateRulePair: function(event) {
    var $target = $(event.target),
      index = Number($target.parents('.pair-container').attr('data-index')),
      key = $target.attr('data-key'),
      pairs = this.model.getPairs();

    if (event.target.tagName === 'INPUT') {
      pairs[index][key] = event.target.value;
    }

    if (event.target.tagName === 'SELECT') {
      pairs[index][key] = event.target.selectedOptions[0].value;
      this.render();
    }
  },

  hideMessage: function() {
    $(this.el).find('.message').hide();
  }
});