RQ.TemplateHelpers.commonHelper = function(ruleJson) {
  ruleJson.RULE_STATUS = RQ.RULE_STATUS;
  ruleJson.RULE_OPERATORS = RQ.RULE_OPERATORS;

  return ruleJson;
};

RQ.TemplateHelpers.placeholders = {
  SOURCE_EQUALS: 'e.g. http://www.example.com',
  SOURCE_CONTAINS: 'e.g. google',
  SOURCE_MATCHES: 'e.g. /example-([0-9]+)/ig',
  DESTINATION_MATCHES: 'e.g. http://www.new-example.com?queryParam=$1&searchParam=$2'
};

RQ.TemplateHelpers.getPlaceholder = function(options) {
  var field = (options.field || '').toUpperCase(),
    operator = (options.operator || '').toUpperCase(),
    DEFAULT_PLACEHOLDER = 'e.g. http://www.new-example.com';

  return this.placeholders[field + '_' + operator] || DEFAULT_PLACEHOLDER;
};

RQ.TemplateHelpers.redirectRuleHelper = function(ruleJson) {
  ruleJson = this.commonHelper(ruleJson);

  _.each(ruleJson.pairs, function(pair) {
    pair['sourcePlaceholder'] = this.getPlaceholder({ field: 'source', operator: pair.source.operator });
    pair['destinationPlaceholder'] = this.getPlaceholder({ field: 'destination', operator: pair.source.operator });
  }, this);

  return ruleJson;
};