module.exports = {
	css: {
		files: ['src/styles/**/*.less'],
		tasks: ['less:main']
	},
	html: {
		files: ['src/html/**/*.jade'],
		tasks: ['jade:main']
	},
	templates: {
		files: ['src/js/tpl/**/*.jade'],
		tasks: ['jade:templates']
	},
	js: {
		files: ['src/js/**/*.js'],
		tasks: ['jshint:main', 'babel:main']
	},
	livereload: {
		files: ['app/**'],
		options: {
			livereload: true
		}
	}
};