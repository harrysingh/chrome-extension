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
    console.error('Handlebars#equals helper expect 2 arguments');
  }

  if (a === b) {
    return options.fn(this);
  }

  return options.inverse(this);
};

RQ.HandlebarHelpers.GreaterThanHelper = function(a, b, options) {
  if (arguments.length < 3) {
    console.error('Handlebars#gt helper expect 2 arguments');
  }

  if (a > b) {
    return options.fn(this);
  }

  return options.inverse(this);
};

RQ.HandlebarHelpers.toLowerCaseHelper = function(value) {
  if (value && typeof value === 'string') {
    return value.toLowerCase();
  }

  return '';
};

RQ.HandlebarHelpers.charAtHelper = function(value, index) {
  if (value && typeof value === 'string') {
    return value.charAt(index);
  }

  return '';
};

RQ.HandlebarHelpers.formatDate = function(dateInMiliseconds) {
  var date = new Date(Number(dateInMiliseconds));

  date = date.toUTCString().split(' ');
  date = date[1] + ' ' + date[2] + ', ' + date[3];

  return date;
};

RQ.HandlebarHelpers.readGlobalVar = function(value) {
  var result = RQ;

  value = value.split('.');

  for (var i = 1; i < value.length; i++) {
    result = result[ value[i] ]
  }

  return result;
};

RQ.HandlebarHelpers.equalsGlobalVar = function(globalVarString, operand, options) {
  var globalVar = RQ.HandlebarHelpers.readGlobalVar(globalVarString);

  if (globalVar === operand) {
    return options.fn(this);
  }

  return options.inverse(this);
};

RQ.HandlebarHelpers.unequalsGlobalVar = function(globalVarString, operand, options) {
  var globalVar = RQ.HandlebarHelpers.readGlobalVar(globalVarString);

  if (globalVar !== operand) {
    return options.fn(this);
  }

  return options.inverse(this);
};

Handlebars.registerHelper('debug', RQ.HandlebarHelpers.DebugHelper);
Handlebars.registerHelper('equals', RQ.HandlebarHelpers.EqualsHelper);
Handlebars.registerHelper('gt', RQ.HandlebarHelpers.GreaterThanHelper);
Handlebars.registerHelper('toLowerCase', RQ.HandlebarHelpers.toLowerCaseHelper);
Handlebars.registerHelper('formatDate', RQ.HandlebarHelpers.formatDate);
Handlebars.registerHelper('charAt', RQ.HandlebarHelpers.charAtHelper);
Handlebars.registerHelper('readGlobalVar', RQ.HandlebarHelpers.readGlobalVar);
Handlebars.registerHelper('equalsGlobalVar', RQ.HandlebarHelpers.equalsGlobalVar);
Handlebars.registerHelper('unequalsGlobalVar', RQ.HandlebarHelpers.unequalsGlobalVar);
