'use strict';
var gulp = require('gulp'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	less = require('gulp-less'),
	jade = require('gulp-jade');
gulp.task('watch', function () {
	gulp.watch('./dist/styles/less/**/*.less', ['less', 'less-pretty']);
	gulp.watch('./dist/templates/jade/**/*.jade', ['jade']);
});
gulp.task('less', function () {
	// place code for your default task here.
	return gulp.src('./dist/styles/less/**/*.less')
		.pipe(less().on('error', function (err) {
			console.log(err);
		}))
		.pipe(cssmin().on('error', function(err) {
			console.log(err);
		}))
		.pipe(rename({
			suffix: '.min',
		}))
		.pipe(gulp.dest('./dist/styles/css/'));
});
gulp.task('less-pretty', function () {
	// place code for your default task here.
	return gulp.src('./dist/styles/less/**/*.less')
		.pipe(less().on('error', function (err) {
			console.log(err);
		}))
		.pipe(gulp.dest('./dist/styles/css/'));
});
gulp.task('jade', function () {
	gulp.src('./dist/templates/jade/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./dist/templates'));
});
gulp.task('default', ['less', 'watch', 'less-pretty', 'jade']);
