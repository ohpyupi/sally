'use strict';
var gulp = require('gulp');
var cssmin = require('gulp-cssmin');
var rename = require('gulp-rename');
var less = require('gulp-less');
var jade = require('gulp-jade');

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
	return gulp.src('./dist/templates/jade/**/*.jade')
		.pipe(jade())
		.pipe(gulp.dest('./dist/templates'));
});

gulp.task('default', ['less', 'watch', 'jade']);
