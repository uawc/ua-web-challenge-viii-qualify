module.exports = {
	options: {
		logConcurrentOutput: true,
		limit: 10
	},
	build: {
		tasks: ['less:main', 'jade:main', 'jade:templates', 'jshint:main', 'babel:main', 'copy:fav', 'copy:img']
	},
	watch: {
		tasks: ['watch:css', 'watch:html', 'watch:templates', 'watch:js', 'watch:livereload']
	},
	run: {
		tasks: ['concurrent:watch', 'connect:main']
	}
};