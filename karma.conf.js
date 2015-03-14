module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      /* Libraries and Helper files */
      'src/libs/jquery-1.9.1.js',
      'src/libs/underscore-1.6.0.js',
      'src/libs/backbone-1.1.2.js',
      'tests/helpers/utils.js',
      'tests/helpers/chromeApiHelper.js',

      /* Code files */
      'src/Shared/utils.js',
      'src/Shared/shared.js',
      'src/background/storageService.js',
      'src/background/background.js',
      'src/pages/js/models/BaseRuleModel.js',

      /* Spec files */
      'tests/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {},

    reporters: ['progress'],

    port: 4001,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};
