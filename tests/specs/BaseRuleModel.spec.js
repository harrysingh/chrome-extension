describe('Base Rule Model', function() {
  var baseRuleModel;

  beforeEach(function() {
    baseRuleModel = new BaseRuleModel();
  });

  it('should have default active status', function() {
    expect(baseRuleModel.getStatus()).toBe(RQ.RULE_STATUS.ACTIVE);
  });

  it('should have placeholders', function() {
    expect(baseRuleModel.placeholders).toBeTruthy();
  });

  it('should have empty id by default', function() {
    expect(baseRuleModel.getId()).toBeFalsy();
  });

  it('should extract id from timestamp', function() {
    var currentTimeStamp = baseRuleModel.getTimestamp(),
      ONE_SECOND = 1000;

    baseRuleModel.setRuleType(RQ.RULE_TYPES.REDIRECT);
    baseRuleModel.generateId();

    expect(baseRuleModel.getTimestampFromId()).toBeTruthy();

    // Expect the generateId operation to happen within 1 second
    expect(baseRuleModel.getTimestampFromId() - currentTimeStamp < ONE_SECOND).toBe(true);
  });

  it('should call setId when generateId is called and id is undefined', function() {
    var id;

    baseRuleModel.setRuleType(RQ.RULE_TYPES.REDIRECT);
    expect(baseRuleModel.getId()).toBeFalsy();

    baseRuleModel.generateId();

    id = baseRuleModel.getId();
    expect(id).toBeTruthy();
    expect(id).toContain(RQ.RULE_TYPES.REDIRECT);
    expect(id).toContain('_');
  });
});