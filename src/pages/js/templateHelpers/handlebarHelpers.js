RQ.HandlebarHelpers.DebugHelper = function(optionalValue) {
  console.group('DebugHelper');
  console.log(this);

  if (optionalValue) {
    console.log(optionalValue);
  }

  console.groupEnd('DebugHelper');
};

RQ.HandlebarHelpers.EqualsHelper = function(a, b, options) {
  if (arguments.length < 3) {
    console.error('Handlebars#equals Helper expect 3 arguments');
  }

  if (a === b) {
    return options.fn(this);
  }

  return options.inverse(this);
};

Handlebars.registerHelper('debug', RQ.HandlebarHelpers.DebugHelper);
Handlebars.registerHelper('equals', RQ.HandlebarHelpers.EqualsHelper);
