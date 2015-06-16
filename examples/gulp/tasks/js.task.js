module.exports = function(gulp, config, $){

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
}