var BaseModel = Backbone.Model.extend({
  getStorageService: function() {
    return RQ.StorageService;
  }
});