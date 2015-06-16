'use strict';
var assert = require('assert');
var gutil = require('gulp-util');
var rep = require('./index');
var path = require('path');


// a standard asset_manifest.json file generated by gulp-asset-manifest
var manifest_body = '{"libs":["bootstrap.min-eedf9ee80c.css","angular.min-5b860c722c.js","bootstrap-2183d05f5a.css"],"user":["test-07422103d7.css"]}';

it('asset tags replace test', function (cb) {
	var stream = rep({
		js_path: '/static/js', // <-- miss / in the end
		css_path: '/static/css/'
	});

	stream.write(new gutil.File({
		path: 'asset-manifest.json',
		contents: new Buffer(manifest_body)
	}));

	stream.write(new gutil.File({
		path: 'index.html',
		contents: new Buffer('<html><%  bundleName  :  libs  %><%bundleName:user%></html>')
	}));

	stream.on('data', function(file){
		var ext = path.extname(file.path);
		var contents = file.contents.toString('utf-8');

		assert(
			/\/static\/css\/bootstrap.min-eedf9ee80c.css/.test(contents),
			'css file test failed'
		);

		assert(
			/\/static\/js\/angular.min-5b860c722c.js/.test(contents),
			'js file test failed'
		);
	});

	cb();
	stream.end()
});