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
var rev = require('gulp-rev');

// group the asset files
var config = {};

config['csses'] = {
	libs: [
		'libfile1.css',
		'libfile2.css',
		'libfile3.css'
	],
	user: [
		'assets/user/*.css'
	]
};

config['jses'] = {
	libs: [
		'libfile1.js',
		'libfile2.js',
		'libfile3.js'
	],
	user: [
	    'assets/user/*.js'
	]
}

// css & js tasks
gulp.task('scss', function(){ /* function */ });
gulp.task('js', function(){ 
    // use gulp-rev to version the asset files and generate the 'asset-manifest.json' file
});
gulp.task('css', ['scss'], function(){
    // use gulp-rev to version the asset files and generate the 'asset-manifest.json' file
});


/*
asset_manifest.json file contents:

{ libs:
   [ 'libfile1.min-eedf9ee80c.css',
    'libfile2.min-jokf9ee80c.css',
    'libfile3.min-eedoefe80c.css',
     'libfile1.min-5b860c722c.js',
     'libfile2.min-5b8oke722c.js',
     'libfile3.min-5b8lkj722c.js' ],
  user: [ 'user1-07422103d7.css', 'user1-fdfsdkflj.js' ] }
*/

// replacement task
gulp.task('rep', ['js', 'css'], function(){
	gulp.src(['html/**/*.html'])
		.pipe(rep({
		    manifest_path: 'asset_manifest.json',
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
<link rel="stylesheet" href="/static/css/libfile1.min-eedf9ee80c.css" />
<link rel="stylesheet" href="/static/css/libfile2.min-jokf9ee80c.css" />
<link rel="stylesheet" href="/static/css/libfile3.min-eedoefe80c.css" />
<script src="/static/js/libfile1.min-5b860c722c.js"></script>
<script src="/static/js/libfile2.min-5b8oke722c.js"></script>
<script src="/static/js/libfile3.min-5b8lkj722c.js"></script>

<!-- user page assets -->
<link rel="stylesheet" href="/static/css/user1-07422103d7.css" />
<script src="/static/js/user1-fdfsdkflj.js"></script>

</html>
```

## API


#### options.manifestPath
Type: `String`
Required: Yes

Path to the asset_manifest.json file generated by [](https://www.npmjs.com/package/gulp-asset-manifest);

#### options.jsPath
Type: `String`
Required: Yes

Base path of site's js path.

#### options.cssPath
Type: `String`
Required: Yes

Base path of site's css path.