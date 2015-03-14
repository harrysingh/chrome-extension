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

  placeholders: {
    SOURCE_EQUALS: 'e.g. http://www.example.com',
    SOURCE_CONTAINS: 'e.g. example',
    SOURCE_MATCHES: 'e.g. /example-([0-9]+)/ig',
    DESTINATION_MATCHES: 'e.g. http://www.new-example.com?queryParam=$1&searchParam=$2'
  },

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
    this.set('status', status);
  },

  getPlaceholder: function(options) {
    var field = (options.field || '').toUpperCase(),
      operator = (options.operator || '').toUpperCase(),
      DEFAULT_PLACEHOLDER = 'e.g. http://www.new-example.com';

    return this.placeholders[field + '_' + operator] || DEFAULT_PLACEHOLDER;
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