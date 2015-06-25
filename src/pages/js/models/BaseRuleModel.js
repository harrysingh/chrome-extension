var BaseRuleModel = Backbone.Model.extend({
  defaults: function() {
    return {
      name: '',
      description: '',
      ruleType: '',
      status: RQ.RULE_STATUS.ACTIVE,
      creationDate: ''
    }
  },

  initialize: function() {
    this.transformAttributes();
  },

  /**
   * To-be overridden by child
   */
  transformAttributes: function() { /* No Op */},

  setId: function(id) {
    this.set('id', id, { silent: true });
  },

  getId: function() {
    return this.get('id');
  },

  generateId: function() {
    var creationDate = this.hasCreationDate() ? this.getCreationDate() : this.getTimestamp(),
      id = this.getRuleType() + '_' + creationDate;

    this.setId(id);
    return id;
  },

  getName: function() {
    return this.get('name');
  },

  setName: function(name) {
    this.set('name', name);
  },

  getDescription: function() {
    return this.get('description');
  },

  setDescription: function(des) {
    this.set('description', des);
  },

  getTimestamp: function() {
    return Date.now();
  },

  getTimestampFromId: function() {
    return this.getId().split('_')[1];
  },

  setCreationDate: function(date) {
    this.set('creationDate', date);
  },

  getCreationDate: function() {
    return this.get('creationDate');
  },

  hasCreationDate: function() {
    return typeof this.get('creationDate') !== 'undefined' && this.get('creationDate');
  },

  getRuleType: function() {
    return this.get('ruleType');
  },

  setRuleType: function(ruleType) {
    this.set('ruleType', ruleType);
  },

  getStatus: function() {
    return this.get('status');
  },

  setStatus: function(status) {
    this.set('status', status, { silent: true });
  },

  getPairs: function() {
    return this.get('pairs');
  },

  setPair: function(index, pair) {
    var pairs = this.getPairs();
    pairs[index] = pair;
  },

  save: function(options) {
    var id = this.getId(),
      storageObject = {},
      storageService = BG.StorageService;

    if (!id) {
      id = this.generateId();
    }

    storageObject[id] = this.toJSON();

    options = options || {};
    options.callback = options.callback || function() {
      console.log('Object saved');
    };

    storageService.saveRecord(storageObject, options.callback);
  },

  remove: function(options) {
    var id = this.getId();

    options = options || {};
    options.callback = options.callback || function() {
      console.log('Object removed');
    };

    BG.StorageService.removeRecord(id, options.callback);
  }
});