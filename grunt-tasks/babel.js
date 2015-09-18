module.exports = {
	main: {
		options: {
			sourceMap: true
		},
		files: [{
			"expand": true,
			"cwd": "src/js",
			"src": ["**/*.js"],
			"dest": "app/js"
		}]
	}
};