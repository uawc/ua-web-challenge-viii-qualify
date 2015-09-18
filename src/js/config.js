require.config({
	baseUrl: 'js',
	paths: {
		jade: '../lib/jade/runtime',
		jquery: '../lib/jquery/dist/jquery',
		underscore: '../lib/underscore/underscore',
		backbone: '../lib/backbone/backbone',
		bootstrap: '../lib/bootstrap/dist/js/bootstrap',
		modal: '../lib/bootstrap/js/modal',
		templates: 'templates'
	},
	shim: {
		underscore: {
			exports: '_'
		},
		backbone: {
			deps: [
				'underscore',
				'jquery'
			],
			exports: 'Backbone'
		},
		modal: {
			deps: ['jquery'],
			exports: '$'
		},
		bootstrap: {
			deps: ['jquery']
		}
	},
	deps: ['main']
});
