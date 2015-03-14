module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      /* Libraries and Helper files */
      'tests/helpers/utils.js',
      'tests/helpers/chromeApiHelper.js',

      /* Code files */
      'src/background/storageService.js',
      'src/background/background.js',

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
