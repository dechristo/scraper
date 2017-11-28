/**
 * Created by Luiz Eduardo de Christo
 * November 27th, 2017
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
          files: ['Gruntfile.js', 'app.js', 'router.js','tests/**/*.spec.js', 'app/src/**/*.js']
        },
        
 		uglify: {
    		options: {
      			mangle: false
    		},
    		my_target: {
      			files: {
        			'app/public/release/js/appController.min.js': ['app/public/js/controllers/appController.js'],
					'app/public/release/js/app.min.js' : ['app/public/js/modules/app.js']
   		 		}
			}
 		},

		cssmin: {
 			options: {
    			mergeIntoShorthands: false,	
  			},
  			target: {
    			files: {
      				'app/public/release/css/styles.min.css': ['app/public/css/styles.css']
    			}
  			}
		},

        watch: {
           files: ['<%= jshint.files %>'],
           tasks: ['jshint'],
        }      
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-notify');

    grunt.task.run('notify_hooks');
    //grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'watch']);
	grunt.registerTask('default', ['jshint', 'uglify', 'cssmin']);
};
