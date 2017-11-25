/**
 * Created by Luiz Eduardo de Christo
 * May 30th, 2017
 * Gruntfile.js
 */

module.exports = function(grunt) {

    grunt.initConfig({
       
       notify_hooks: {
          options: {
            enabled: true,
            title: 'Page Analyzer',
            duration: 5
          }
       },

       jshint: {
          files: ['Gruntfile.js', 'app.js', 'router.js', 'test/*.js','test/**/*.js', 'public/js/**/*.js', 'src/**/*.js']
        },
        
        watch: {
           files: ['<%= jshint.files %>'],
           tasks: ['jshint'],
        }      
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.task.run('notify_hooks');
    grunt.registerTask('default', ['jshint', 'watch']);

};