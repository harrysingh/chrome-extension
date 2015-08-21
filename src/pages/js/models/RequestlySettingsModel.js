var RequestlySettingsModel = BaseModel.extend({
  defaults: {
    id: RQ.STORAGE_KEYS.REQUESTLY_SETTINGS,
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

  _disableExtensionInBackground: function() {
    backgroundObject.Methods.disableExtension();
  },

  disableExtension: function() {
    var that = this;

    this.setExtensionEnabled(false, function() {
      that._disableExtensionInBackground();
    });
  },

  enableExtension: function() {
    this.setExtensionEnabled(true, function() {
      // backgroundObject.Methods.enableExtension();
    });
  },

  save: function(callback) {
    var id = this.getId(),
      storageObject = {},
      storageService = this.getStorageService();

    storageObject[id] = this.toJSON();

    callback = callback || function() {
      console.log('Requestly Settings Saved: ', storageObject);
    };

    storageService.saveRecord(storageObject, callback);

    // callback();
  }
});