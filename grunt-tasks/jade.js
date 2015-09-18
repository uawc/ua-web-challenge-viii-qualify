var path = require('path');

module.exports = {
	main: {
		expand: true,
		cwd: 'src/html',
		src: ['**/*.jade'],
		dest: 'app',
		ext: '.html'
	},
	templates: {
		files: {
			'app/js/templates.js': 'src/js/templates/**/*.jade'
		},
		options: {
			amd: true,
			client: true,
			processName: function (name) {
				return path.basename(name, '.jade');
			}
		}
	}
};