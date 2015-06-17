module.exports = function(gulp, config, $){

	gulp.task('scss', function(){
		return gulp.src(config.sassfiles)
			.pipe($.sass())
			.pipe($.autoprefixer('last 10 version'))
			.pipe(gulp.dest(config.buildcssdir));
	});

	var css_tasks = [];

	function make_task(bundle_name){
		var task_name = 'css-' + bundle_name
		css_tasks.push(task_name)

		var fn = function(){
			return gulp.src(config['csses'][bundle_name])
				// .pipe($.concat( bundle_name + '.css'))
				.pipe($.rev())
				.pipe($.filename({ bundleName: bundle_name, log:true }))
				.pipe($.minifycss())
				.pipe(gulp.dest(config.staticdir + 'css/'));
		}

		gulp.task(task_name, ['scss'], fn);
	}

	for(bundle_name in config['csses']) {
		make_task(bundle_name)
	}

	gulp.task('css', css_tasks);

}