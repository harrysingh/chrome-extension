var SettingsModel = BaseModel.extend({
  defaults: {
    id: 'rq_settings',
    avoidCache: true,
    isExtensionEnabled: true
  },

  getId: function() {
    return this.get('id');
  },

  setExtensionEnabled: function(isEnabled, callback) {
    this.set('isExtensionEnabled', isEnabled);
    this.save(callback);
  },

  disableExtension: function(options) {
    options = options || {};
    this.setExtensionEnabled(false, options.callback);
  },

  enableExtension: function(options) {
    options = options || {};
    this.setExtensionEnabled(true, options.callback);
  },

  save: function(callback) {
    var id = this.getId(),
      storageObject = {},
      storageService = this.getStorageService();

    storageObject[id] = this.toJSON();

    callback = callback || function() {
      console.log('Requestly Settings Saved');
    };

    storageService.saveRecord(storageObject, callback);
  }
});