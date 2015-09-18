module.exports = {
	main: {
		options: {
			paths: ['src/styles'],
			compress: true
		},
		files: [
			{
				expand: true,
				cwd: 'src/styles',
				src: ['*.less'],
				dest: 'app/css/',
				ext: '.css'
			}
		]
	}
};