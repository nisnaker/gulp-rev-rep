'use strict';
var gutil = require('gulp-util');
var PluginError  = gutil.PluginError;
var through = require('through2');
var path = require('path');

var PLUGIN_NAME = 'gulp-rev-rep';


module.exports = function(opts){
	opts = opts || { js_path: 'rep/js/', css_path: 'rep/css/' };
	var i;
	for(i in opts) {
		if('/' != opts[i].slice(-1))
			opts[i] += '/'
	}

	// collect json & html files
	var manifest = {};
	var htmlfiles = [];

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
		for(i in manifest[bundleName]) {
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
			var ext = path.extname(file.path);
			if(ext === '.json') {
				var json = {}
			
				try{
					var content = file.contents.toString('utf-8');
					if(content) {
						manifest = JSON.parse(content);
					}
				} catch (x) {
					this.emit('error', new PluginError(PLUGIN_NAME, x))
					return;
				}
			}
			else if(ext === '.html')
			{
				htmlfiles.push(file)
			}
		}

		cb();
	}, function(cb){

		// process each html file
		htmlfiles.forEach(function (file) {

			var src = file.contents.toString('utf-8');

			src = rep(src)

			file.contents = new Buffer(src)
			this.push(file)
		}, this)

		cb();
	});
}