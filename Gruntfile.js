module.exports = function (grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	less: {
		development: {
			options: {
				compress: true,
				yuicompress: true,
				optimization: 2,
			},
			files: [
				{
					expand: true,
					cwd: 'dist/less',
					src: '**/*.less',
					dest: 'dist/css',
					ext: '.min.css'
				}
			],
		},
	},
	watch: {
		styles: {
			files: ['dist/style/less/*.less'],
			task: ['less'],
			options: {
				nospawn: true,
			},
		},
	},
});

grunt.loadNpmTasks('grunt-contrib-less');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.registerTask('default', ['less', 'watch']);

};
