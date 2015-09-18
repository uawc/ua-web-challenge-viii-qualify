module.exports = function(grunt) {

	grunt.initConfig(require('require-dir')('./grunt-tasks'));

	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-less');
	grunt.loadNpmTasks('grunt-contrib-jade');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-concurrent');
	grunt.loadNpmTasks('grunt-babel');


	grunt.registerTask('default', ['concurrent:build', 'concurrent:run']);
	grunt.registerTask('cleanAll', ['clean:main']);
};
