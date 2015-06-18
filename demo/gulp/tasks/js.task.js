module.exports = function(gulp, config, $){

	var js_tasks = [];

	function make_task(bundle_name){
		var task_name = 'js-' + bundle_name
		js_tasks.push(task_name)

		var fn = function(){
			return gulp.src(config['jses'][bundle_name])
				// .pipe($.concat( bundle_name + '.js'))
				.pipe($.uglify())
				.pipe($.rev())
				.pipe($.filename({ bundleName: bundle_name, log: true }))
				.pipe(gulp.dest(config.staticdir + 'js/'))		}

		gulp.task(task_name, fn);
	}

	for(bundle_name in config['jses']) {
		make_task(bundle_name);
	}

	gulp.task('js', js_tasks);
}