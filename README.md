[![Build Status](https://travis-ci.org/nisnaker/gulp-rev-rep.svg)](https://travis-ci.org/nisnaker/gulp-rev-rep)
[![Dependencies](https://david-dm.org/nisnaker/gulp-rev-rep.svg)](https://david-dm.org/nisnaker/gulp-rev-rep)
[![devDependencies](https://david-dm.org/nisnaker/gulp-rev-rep/dev-status.svg)](https://david-dm.org/nisnaker/gulp-rev-rep#info=devDependencies&view=table)
[![NPM version](https://badge.fury.io/js/gulp-rev-rep.svg)](http://badge.fury.io/js/gulp-rev-rep)

# gulp-rev-rep
Replace the asset parts of html with revisioned filename.
You can find some example code [here](https://github.com/nisnaker/gulp-rev-rep/tree/master/examples).

## Install 
```sh
$ npm install --save gulp-rev-rep
```

## Usage

```js
var gulp = require('gulp'),
	rev = require('gulp-rev'),
	filename = require('gulp-asset-manifest'),
	minifycss = require('gulp-minify-css'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	rep = require('gulp-rev-rep');


// group the asset files

var config = [];

config['csses'] = {
	libs: [
		'bootstrap/dist/css/bootstrap.min.css',
		'bootstrap/dist/css/bootstrap.css',
	],
	user: [
		'assets/**/*.css'
	]
};

config['jses'] = {
	libs: [
		'angular/angular.min.js'
	]
}

// css tasks

gulp.task('scss', function(){
	return gulp.src(config.sassfiles)
		.pipe($.sass())
		.pipe($.autoprefixer('last 10 version'))
		.pipe(gulp.dest(config.buildcssdir));
});

var css_tasks = [];

for(css_bundle_name in config['csses']) {

	var task_name = 'css-' + css_bundle_name;
	css_tasks.push(task_name);

	gulp.task(task_name, ['scss'], function(){
		return gulp.src(config['csses'][css_bundle_name])
			// .pipe($.concat( css_bundle_name + '.css'))
			.pipe($.rev())
			.pipe($.filename({ bundleName: css_bundle_name }))
			.pipe($.minifycss())
			.pipe(gulp.dest(config.staticdir + 'css/'));
	});
}

gulp.task('css', css_tasks, function(){
	return gulp
});

// js tasks

var js_tasks = [];

for(js_bundle_name in config['jses']) {

	var task_name = 'js-' + css_bundle_name;
	js_tasks.push(task_name);

	gulp.task(task_name, ['scss'], function(){
		return gulp.src(config['jses'][js_bundle_name])
			// .pipe($.concat( js_bundle_name + '.js'))
			.pipe($.uglify())
			.pipe($.rev())
			.pipe($.filename({ bundleName: js_bundle_name }))
			.pipe(gulp.dest(config.staticdir + 'js/'))
	});
}

gulp.task('js', js_tasks, function(){
	return gulp
});

/*
asset_manifest.json file contents:

{ libs:
   [ 'bootstrap.min-eedf9ee80c.css',
     'angular.min-5b860c722c.js',
     'bootstrap-2183d05f5a.css' ],
  user: [ 'test-07422103d7.css' ] }
*/

gulp.task('rep', ['js', 'css'], function(){
	gulp.src(['asset_manifest.json', 'html/**/*.html'])
		.pipe(rep({
			js_path: '/static/js',
			css_path: '/static/css/'
		}))
		.pipe(gulp.dest('public'))
});

gulp.task('default', ['css', 'js', 'rep']);

```

## Result

from index.html:
```html
<html>

<!-- libs assets -->
<% bundleName:libs %>

<!-- user page assets -->
<% 
 bundleName :
 user  %>

</html>
```

to index.html:
```html
<html>

<!-- libs assets -->
<script src="/static/js/angular.min-5b860c722c.js"></script>
<link rel="stylesheet" href="/static/css/bootstrap.min-eedf9ee80c.css">
<link rel="stylesheet" href="/static/css/bootstrap-2183d05f5a.css">

<!-- user page assets -->
<link rel="stylesheet" href="/static/css/test-07422103d7.css">

</html>
```