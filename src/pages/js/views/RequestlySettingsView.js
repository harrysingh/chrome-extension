var RequestlySettingsView = BaseView.extend({
  Model: RequestlySettingsModel,

  id: 'requestly-settings-editor',

  getTemplate: function() {
    return RQ.Templates.RequestlySettings
  },

  events: {
    'change .extension-toggle': 'toggleExtension'
  },

  toggleExtension: function(event) {
    var isEnabled = $(event.currentTarget).is(':checked');
    isEnabled ? this.model.enableExtension() : this.model.disableExtension();
  },

  initWidgets: function() {
    this.$el.find('.extension-toggle').bootstrapToggle();
  }

});