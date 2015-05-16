RQ.HandlebarHelpers.DebugHelper = function(optionalValue) {
  console.log('Current Context');
  console.log('====================');
  console.log(this);

  if (optionalValue) {
    console.log('Value');
    console.log('====================');
    console.log(optionalValue);
  }
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
