var ReplaceRuleEditorView = BaseRuleEditorView.extend({

  Model: ReplaceRuleModel,

  id: 'replace-rule-editor',

  getTemplate: function() {
    return RQ.Templates.REPLACE_RULE_EDITOR_TEMPLATE;
  },

  className: 'replace-rule-editor',

  events: _.extend(BaseRuleEditorView.prototype.events, {
    'click .add-pair': 'addPair',
    'click .delete-pair': 'deletePair',
    'keyup .pair-container input': 'updateRulePair'
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

    pairs[index][key] = event.target.value;
  }
});