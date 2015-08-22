var BaseModel = Backbone.Model.extend({
  getStorageService: function() {
    return BG.StorageService;
  }
});