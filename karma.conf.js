module.exports = function(config) {
  config.set({

    basePath: './',

    frameworks: ['jasmine'],

    plugins : [
      'karma-jasmine',
      'karma-phantomjs-launcher',
    ],

    files: [
      /* Libraries and Helper files */
      'src/libs/jquery-1.9.1.js',
      'src/libs/underscore-1.6.0.js',
      'src/libs/backbone-1.1.2.js',
      'tests/helpers/utils.js',
      'tests/helpers/chromeApiHelper.js',

      /* Code files */
      'src/pages/js/app.js',
      'src/Shared/utils.js',
      'src/Shared/shared.js',
      'src/background/storageService.js',
      'src/background/background.js',
      'src/pages/js/models/BaseModel.js',
      'src/pages/js/models/BaseRuleModel.js',
      'src/pages/js/models/RedirectRuleModel.js',
      'src/pages/js/models/CancelRuleModel.js',
      'src/pages/js/models/ReplaceRuleModel.js',
      'src/pages/js/models/HeadersRuleModel.js',
      'src/pages/js/mixins/InputValidation.js',
      'src/pages/js/views/BaseRuleEditorView.js',

      /* Spec files */
      'tests/**/*.spec.js'
    ],

    exclude: [],

    preprocessors: {},

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['PhantomJS'],

    singleRun: false
  });
};
