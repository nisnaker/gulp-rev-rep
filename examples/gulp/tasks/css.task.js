module.exports = function(gulp, config, $){

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

}