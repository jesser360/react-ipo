module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

		less: {
			dev: {
				options: {
					plugins: [
						new (require('less-plugin-autoprefix'))({browsers: ["last 2 versions"]}),
          	require('less-plugin-group-css-media-queries')
					]
				},
				files: {
					'style.css': 'assets/src/less/style.less'
				}
			}
		},

  	uglify: {
	    build: {
	      src: 'assets/src/js/*.js',
	      dest: 'assets/production-assets/js/scripts.min.js'
	    }
		},

		watch: {
			css: {
				files: ['assets/src/less/*.less'],
				tasks: ['less'],
				options: {
					livereload: true
				}
			},
			scripts: {
				files: ['assets/src/js/*.js'],
				tasks: ['uglify'],
				options: {
					livereload: true
				}
			}
		}
  });

	grunt.loadNpmTasks('grunt-contrib-less-compiler');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less', 'uglify']);
};