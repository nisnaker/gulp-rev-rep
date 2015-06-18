var gulp = require('gulp'),
	config = require('./gulp.config')(),
	$ = {};

$.gulp = require('gulp');
$.sass = require('gulp-sass');
$.autoprefixer = require('gulp-autoprefixer');
$.minifycss = require('gulp-minify-css');
$.uglify = require('gulp-uglify');
$.rev = require('gulp-rev');
$.revCollector = require('gulp-rev-collector');
$.concat = require('gulp-concat');
$.filename = require('gulp-asset-manifest');
$.rep = require('gulp-rev-rep');

var tasks = require('fs').readdirSync('./gulp/tasks/');
tasks.forEach(function (file) {
	require('./tasks/' + file)(gulp, config, $);
});

gulp.task('default', ['css', 'js', 'rep']);
// gulp.task('default', ['rep']);

// gulp.task('watch', ['build'], function(){
// 	gulp.watch('assets/sass/**/*.scss', ['css']);
// 	gulp.watch('assets/css/**/*.css', ['css']);
// 	gulp.watch('assets/js/**/*.js', ['js']);
// });
