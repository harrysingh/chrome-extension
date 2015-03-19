describe('Utility functions', function() {

  it('should have Regex format', function() {
    expect(RQ.Utils.regexFormat).toBe('^\/(.+)\/(|i|g|ig|gi)$');
  });

  it('should validate Regex', function() {
    expect(RQ.Utils.isValidRegex('/test/i')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('/test/')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('test')).toBeFalsy();
    expect(RQ.Utils.isValidRegex('/test/g')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('/test[0-9]/gi')).toBeTruthy();
    expect(RQ.Utils.isValidRegex('/test/g')).toBeTruthy();
  });

  it('should convert given string to regex', function() {
    expect(RQ.Utils.toRegex('/test/i') instanceof RegExp).toBe(true);
    expect(RQ.Utils.toRegex('test')).toBeNull();
  });

  it('should validate Url', function() {
    expect(RQ.Utils.isValidUrl('google.com')).toBe(false);
    expect(RQ.Utils.isValidUrl('http://www.example.com')).toBe(true);
    expect(RQ.Utils.isValidUrl('http.example.com')).toBe(false);
  });
});