module.exports = function(gulp, config, $){

	gulp.task('rep', ['js', 'css'], function(){
		gulp.src(['html/**/*.html'])
			.pipe($.rep({
				manifestPath: 'asset_manifest.json',
				jsPath: '/static/js',
				cssPath: '/static/css/'
			}))
			.pipe(gulp.dest('public'))
	});

}