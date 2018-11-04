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
					'src/index.css': 'less/index.less'
				}
			}
		},

		watch: {
			css: {
				files: ['less/*.less'],
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
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['less']);
};