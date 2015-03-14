describe('Base Rule Model', function() {
  var baseRuleModel,
    StorageService = BG.StorageService;

  beforeEach(function() {
    baseRuleModel = new BaseRuleModel();
    StorageService.clearDB();
  });

  it ('should have default active status', function() {
    expect(baseRuleModel.getStatus()).toBe(RQ.RULE_STATUS.ACTIVE);
  });

  it ('should have placeholders', function() {
    expect(baseRuleModel.placeholders).toBeTruthy();
  });

  it ('should have empty id by default', function() {
    expect(baseRuleModel.getId()).toBeFalsy();
  });

  it ('should call setId when generateId is called and id is undefined', function() {
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