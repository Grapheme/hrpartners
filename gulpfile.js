var gulp = require('gulp');
var connect = require('gulp-connect');
var open = require('gulp-open');
var jade = require('gulp-jade');
var sass = require('gulp-sass');
var gulpIgnore = require('gulp-ignore');
var concat = require('gulp-concat');
var prefix = require('gulp-autoprefixer');
var bowerMain = require('bower-main');
// var rev = require('gulp-rev');
var plumber = require('gulp-plumber');
	
var build_path = './build';
var app_path = './src';
var port = 8080;
 
gulp.task('server', function() {
	connect.server({
		root: build_path,
		livereload: true
	});

	gulp.src(build_path + '/index.html')
		.pipe(open('', { url: 'http://localhost:' + port }));
});

var js_files = bowerMain('js','min.js');
scripts = js_files.normal.concat(app_path + '/scripts/*.js')
console.log('scripts load order:');
console.log(scripts);


gulp.task('scripts', function() {
	return gulp.src(scripts)
		.pipe(concat('main.concat.js'))
		.pipe(gulp.dest(build_path + '/scripts/'))
		.pipe(connect.reload());
		// .pipe(rev.manifest())
		// .pipe(gulp.dest(app_path));
});

gulp.task('jade', function() {
	gulp.src(app_path + '/views/*.jade')
		.pipe(plumber())
		.pipe(jade({
			locals: {
				// hahaha: true
			},
			pretty: true
		}))
		.pipe(gulp.dest(build_path))
		.pipe(connect.reload());
});

gulp.task('sass', function () {
	gulp.src(app_path + '/styles/main.scss')
		.pipe(sass.sync().on('error', sass.logError))
		.pipe(prefix("last 3 version", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest(build_path + '/styles'))
		.pipe(connect.reload());
});

gulp.task('copy_static', function () {
	gulp.src(app_path + '/fonts/**/*')
	 .pipe(gulp.dest(build_path + '/fonts'));

	gulp.src(app_path + '/images/**/*')
	 .pipe(gulp.dest(build_path + '/images'));
});

gulp.task('watch', function() {
	gulp.watch(app_path + '/views/**/*.jade', ['jade']);
	gulp.watch(app_path + '/styles/**/*.scss', ['sass']);
	gulp.watch(app_path + '/scripts/**/*.js', ['scripts']);
	gulp.watch([app_path + '/fonts/**', app_path + '/images/**'], ['copy_static']);
});

gulp.task('deploy', ['build'], function() {
	console.log('no deploy options specified 😒');
});

gulp.task('build', ['scripts', 'sass', 'copy_static', 'jade']);

gulp.task('default', [ 'build', 'watch', 'server']);