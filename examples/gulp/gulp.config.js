module.exports = function(){
	var bower_path ='bower_components/';
	var buildcssdir = 'assets/dist/css/';
	var staticdir = 'public/static/';
	var htmldir = 'html';

	var config = {};

	config['sassfiles'] = ['assets/sass/**/*.scss'];
	config['buildcssdir'] = buildcssdir;
	config['staticdir'] = staticdir;
	config['htmldir'] = htmldir;

	config['sassfiles'].push(bower_path + 'mdi/scss/materialdesignicons.scss');

	config['csses'] = {
		lumx_css: [
			bower_path + 'lumx/dist/lumx.css',
			buildcssdir + 'materialdesignicons.css',
		],
		admin: [
			// buildcssdir + '**/*.css'
		]
	};

	config['jses'] = {
		lumx_js: [
			bower_path + 'jquery/dist/jquery.min.js',
			bower_path + 'velocity/velocity.min.js',
			bower_path + 'moment/min/moment-with-locales.min.js',
			bower_path + 'angular/angular.min.js',
			bower_path + 'lumx/dist/lumx.min.js'

			// bower_path + 'lodash/lodash.min.js',
			// bower_path + 'restangular/dist/restangular.min.js'
		],
		admin: []
	}

	return config;
}