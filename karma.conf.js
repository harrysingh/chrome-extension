module.exports = function(config) {
  config.set({

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'test/**/*.spec.js'
    ],

    exclude: [
      
    ],

    preprocessors: {
    
    },

    reporters: ['progress'],

    port: 4001,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    browsers: ['Chrome'],

    singleRun: false
  });
};
