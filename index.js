'use strict';
var gutil = require('gulp-util');
var PluginError  = gutil.PluginError;
var through = require('through2');
var path = require('path');
var fs = require('fs');

var PLUGIN_NAME = 'gulp-rev-rep';


module.exports = function(opts){
	opts = opts || { manifest_path: 'asset_manifest.json', js_path: 'rep/js/', css_path: 'rep/css/' };
	
	if('/' != opts['js_path'].slice(-1))
		opts['js_path'] += '/';
	if('/' != opts['css_path'].slice(-1))
		opts['css_path'] += '/';


	try{
		var json_data = fs.readFileSync(opts.manifest_path, "utf-8");
		var manifest = JSON.parse(json_data);
	}
	catch (x) {
		throw new PluginError(PLUGIN_NAME, x);
		return;
	}

	// collect html files
	var files = [];

	// get bundleNames from html files, and replace them
	var reps = {};
	var pattern = /<%\s*bundleName\s*:\s*(.*?)\s*%>/g;
	
	function rep(cnt){
		var ret, s = cnt;
		while(ret = pattern.exec(cnt)) {
			s = s.replace(ret[0], _asset_tag(ret[1]));
		}

		return s
	}

	function _asset_tag(bundleName) {
		if(reps[bundleName])
			return reps[bundleName]

		if(!manifest[bundleName])
			return ''

		var s = [], asset, ext;
		for(var i in manifest[bundleName]) {
			asset = manifest[bundleName][i]
			ext = path.extname(asset)
			if('.js' == ext)
				s.push('<script src="' + opts.js_path + asset + '"></script>')
			else if('.css' == ext)
				s.push('<link rel="stylesheet" href="' + opts.css_path + asset + '">')
		}

		return s.join("\n")
	}


	return through.obj(function (file, enc, cb) {
		
		// collect files
		if(!file.isNull()) {
			files.push(file)
		}

		cb();
	}, function(cb){

		// process each html file
		files.forEach(function (file) {

			var src = file.contents.toString('utf-8');

			src = rep(src)

			file.contents = new Buffer(src)
			this.push(file)
		}, this)

		cb();
	});
}