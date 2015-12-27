var RuleCardsView = Backbone.View.extend({

  Template: function() {
    return RQ.Templates.RULE_CARDS_TEMPLATE;
  },

  events: {
    'click .panel': 'selectRule'
  },

  render: function(options) {
    if (options && options.model && options.model instanceof Backbone.Model) {
      this.model = options.model;
    }

    var markup = RQ.Templates.RuleCardsView;
    $(this.el).html(markup);
  },

  selectRule: function(event) {
    var $panel = $(event.currentTarget),
      ruleEditorRoute = $panel.attr('data-target');

    RQ.router.navigate(ruleEditorRoute, true);
  }
});