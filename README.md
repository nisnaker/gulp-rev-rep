[![Build Status](https://travis-ci.org/nisnaker/gulp-rev-rep.svg)](https://travis-ci.org/nisnaker/gulp-rev-rep)
[![Downloads](http://img.shields.io/npm/dm/gulp-rev-rep.svg)](https://npmjs.org/package/gulp-rev-rep)
[![Dependencies](https://david-dm.org/nisnaker/gulp-rev-rep.svg)](https://david-dm.org/nisnaker/gulp-rev-rep)
[![devDependencies](https://david-dm.org/nisnaker/gulp-rev-rep/dev-status.svg)](https://david-dm.org/nisnaker/gulp-rev-rep#info=devDependencies&view=table)
[![NPM version](https://badge.fury.io/js/gulp-rev-rep.svg)](http://badge.fury.io/js/gulp-rev-rep)

# gulp-rev-rep
Replace the asset parts of html with revisioned filename.
You can find some example code **[here](https://github.com/nisnaker/gulp-rev-rep/tree/master/demo)**.

## Install 
```sh
$ npm install --save gulp-rev-rep
```

## Usage

```js
var rep = require('gulp-rev-rep');

// group the asset files
var config = {};

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

// css & js tasks
gulp.task('scss', function(){ /* functin */ });
gulp.task('css', ['scss'], function(){ /* functin */ });
gulp.task('js', function(){ /* functin */ });


/*
asset_manifest.json file contents:

{ libs:
   [ 'bootstrap.min-eedf9ee80c.css',
     'angular.min-5b860c722c.js',
     'bootstrap-2183d05f5a.css' ],
  user: [ 'test-07422103d7.css' ] }
*/

// replacement task
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

from html/index.html:
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

to public/index.html:
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