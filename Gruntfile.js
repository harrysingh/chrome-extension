/**
 *  @References
 * [0] http://gruntjs.com/getting-started to install grunt-cli
 * [1]: https://github.com/01org/grunt-zipup
 * [2]: https://github.com/gruntjs/grunt-contrib-handlebars
 **/

module.exports = function (grunt) {

  grunt.initConfig({
    zipup: {
      package: {
        appName: 'Requestly',
        version: '3.3.6',
        files: [
          { cwd: 'src', src: '**', expand: true, dest: 'src' },
          { cwd: 'resources', src: '**', expand: true, dest: 'resources' },
          { src: 'manifest.json'}
        ],
        outDir: 'build'
      }
    },

    /**
     * Task handlebars: Pre-Compile template files, concat them and save output to templates.js
     */
    handlebars: {
      compile: {
        options: {
          namespace: 'RQ.Templates',
          processName: function(filePath) {
            var pieces = filePath.split('/'),
              fileName = pieces[ pieces.length - 1 ];

            return fileName.replace(/(\.hbs)/ig, '');
          }
        },
        files: {
          'src/pages/templates.js': 'src/pages/templates/RedirectRuleEditor.hbs'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-zipup');
  grunt.loadNpmTasks('grunt-contrib-handlebars');

  grunt.registerTask('build', ['handlebars', 'zipup']);
  grunt.registerTask('precompile-handlebars', ['handlebars']);
};

