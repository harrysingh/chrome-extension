var RuleCardsView = Backbone.View.extend({

  events: {
    'click .rule-card': 'selectRule'
  },

  render: function(options) {
    if (options && options.model && options.model instanceof Backbone.Model) {
      this.model = options.model;
    }

    var markup = RQ.Templates.RuleCardsView;
    $(this.el).html(markup);
  },

  selectRule: function(event) {
    var $ruleCard = $(event.currentTarget),
      ruleEditorRoute = $ruleCard.attr('data-target');

    RQ.router.navigate(ruleEditorRoute, true);
  }
});