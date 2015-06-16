module.exports = function(gulp, config, $){

	gulp.task('rep', ['js', 'css'], function(){
		gulp.src(['asset_manifest.json', 'html/**/*.html'])
			.pipe($.rep({
				js_path: '/static/js',
				css_path: '/static/css/'
			}))
			.pipe(gulp.dest('public'))
	});

}