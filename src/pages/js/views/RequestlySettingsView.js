var RequestlySettingsView = BaseView.extend({
  Model: RequestlySettingsModel,

  id: 'requestly-settings-editor',

  getTemplate: function() {
    return RQ.Templates.RequestlySettings
  }
});