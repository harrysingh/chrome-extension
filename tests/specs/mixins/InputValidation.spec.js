describe('InputValidation Mixin', function() {

  var inputValidationMixin = RQ.Mixins.InputValidation,
    equalsOperator = RQ.RULE_OPERATORS.EQUALS,
    matchesOperator = RQ.RULE_OPERATORS.MATCHES,
    containsOperator = RQ.RULE_OPERATORS.CONTAINS;

  it('should validate source field', function() {
    expect(inputValidationMixin.validateSourceField(equalsOperator, '')).toBe(false);
    expect(inputValidationMixin.validateSourceField(equalsOperator, 'google.com')).toBe(false);
    expect(inputValidationMixin.validateSourceField(containsOperator, 'google.com')).toBe(true);
    expect(inputValidationMixin.validateSourceField(equalsOperator, 'http://google.com')).toBe(true);
    expect(inputValidationMixin.validateSourceField(matchesOperator, '/http/gi')).toBe(true);
  });

  it('should validate source field', function() {
    expect(inputValidationMixin.validateSourceField(equalsOperator, 'google.com')).toBe(false);
    expect(inputValidationMixin.validateSourceField(equalsOperator, 'http://google.com')).toBe(true);
  });
});