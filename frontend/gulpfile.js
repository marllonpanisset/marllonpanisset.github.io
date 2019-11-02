const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

let dev = true;

gulp.task('views', () => {
  gulp.src('app/views/*.pug')
	.pipe($.pug({
	  pretty: true
	}))
	.pipe($.plumber())
	// .pipe($.htmlmin({
	//   collapseWhitespace: true,
	//   removeComments: true
	// }))
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/')))
	.pipe($.size({title: 'pug'}))
	.pipe(reload({stream: true}));
});

gulp.task('fonts', () => {
	return gulp.src('app/fonts/*')
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/fonts')))
});

gulp.task('images', () => {
  return gulp.src('app/images/*')
	.pipe($.cache($.imagemin()))
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/images')))
});

gulp.task('styles', () => {
	return gulp.src('app/styles/**/*.scss')
	.pipe($.plumber())
	.pipe($.if(dev, $.sourcemaps.init()))
	.pipe($.sass.sync({
	  outputStyle: 'compressed',
	  precision: 10,
	  includePaths: ['.']
	}).on('error', $.sass.logError))
	.pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
	.pipe($.if(dev, $.sourcemaps.write()))
	.pipe($.if(dev, gulp.dest('.tmp/styles'), gulp.dest('dist/styles')))
	.pipe(reload({stream: true}));
});

gulp.task('styles:vendor', () => {
  return gulp.src([
		'node_modules/animate.css/animate.css',
		'app/styles/aos.css'
	])
	.pipe($.concat('vendor.min.css'))
	.pipe($.plumber())
	.pipe($.if(dev, $.sourcemaps.init()))
	.pipe($.sass.sync({
	  outputStyle: 'compressed',
	  precision: 10,
	  includePaths: ['.']
	}).on('error', $.sass.logError))
	.pipe($.autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']}))
	.pipe($.if(dev, $.sourcemaps.write()))
	.pipe($.if(dev, gulp.dest('.tmp/styles'), gulp.dest('dist/styles')))
	.pipe(reload({stream: true}));
});

gulp.task('scripts:main', () => {
  return gulp.src('app/scripts/main.js')
	.pipe($.concat('main.min.js'))
	.pipe($.plumber())
	.pipe($.uglify())
	.pipe($.babel())
	.pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	.pipe(reload({stream: true}));
});

gulp.task('scripts:jquery', () => {
  return gulp.src('node_modules/jquery/dist/jquery.js')
	.pipe($.concat('jquery.min.js'))
	.pipe($.plumber())
	.pipe($.uglify())
	.pipe($.babel())
	.pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	.pipe(reload({stream: true}));
});

gulp.task('scripts:vanilla-match-heights', () => {
  return gulp.src('app/scripts/vanilla-match-heights.js')
	.pipe($.plumber())
	// .pipe($.uglify())
	// .pipe($.babel())
	.pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	.pipe(reload({stream: true}));
});

gulp.task('scripts:aos', () => {
	return gulp.src('app/scripts/aos.js')
	  .pipe($.plumber())
	  // .pipe($.uglify())
	  // .pipe($.babel())
	  .pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	  .pipe(reload({stream: true}));
});

gulp.task('scripts:modernizr', () => {
  return gulp.src('app/scripts/modernizr.js')
	.pipe($.concat('modernizr.min.js'))
	.pipe($.plumber())
	.pipe($.uglify())
	.pipe($.babel())
	.pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	.pipe(reload({stream: true}));
});

gulp.task('manifest.json', () => {
	return gulp.src('app/manifest.json')
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/')))
});

gulp.task('service-workers.js', () => {
	return gulp.src('app/service-workers.js')
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/')))
});

gulp.task('favico', () => {
	return gulp.src('app/favico.ico')
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/')))
});

function lint(files) {
  return gulp.src(files)
	.pipe($.eslint({fix: true}))
	.pipe(reload({stream: true, once: true}))
	.pipe($.eslint.format())
	.pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}

gulp.task('lint', () => {
  return lint('app/scripts/**/*.js')
	.pipe(gulp.dest('app/scripts'));
});

gulp.task('lint:test', () => {
  return lint('test/spec/**/*.js')
	.pipe(gulp.dest('test/spec'));
});

gulp.task('html', ['styles', 'styles:vendor', 'scripts:jquery', 'scripts:main', 'scripts:modernizr', 'scripts:aos', 'scripts:vanilla-match-heights', 'manifest.json', 'service-workers.js', 'views'], () => {
  return gulp.src('.tmp/*.html')
	.pipe($.useref({searchPath: ['.tmp', '.']}))
	.pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
	.pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
	.pipe(gulp.dest('dist'));
});

gulp.task('extras', () => {
  return gulp.src([
	'app/*',
	'!app/views'
  ], {
	dot: true
  }).pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
	runSequence(['clean'], ['views'], ['styles', 'fonts', 'styles:vendor', 'scripts:main', 'scripts:jquery', 'scripts:modernizr', 'manifest.json', 'service-workers.js','scripts:aos','scripts:vanilla-match-heights'], () => {
		browserSync.init({
			notify: false,
			port: 9000,
			server: {
			baseDir: ['.tmp', 'app'],
			routes: {
				'/node_modules': 'node_modules'
			}
		}
	});

	gulp.watch([
	  'app/images/*',
	]).on('change', reload);
	gulp.watch('app/views/**/*.pug', ['views', reload]);
	gulp.watch(['app/styles/**/*.scss'], ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts:main']);
  });
});

gulp.task('serve:dist', ['default'], () => {
  browserSync.init({
	notify: false,
	port: 9000,
	server: {
	  baseDir: ['dist']
	}
  });
});

gulp.task('serve:test', ['scripts:main'], () => {
  browserSync.init({
	notify: false,
	port: 9000,
	ui: false,
	server: {
	  baseDir: 'test',
	  routes: {
		'/scripts': '.tmp/scripts',
		'/node_modules': 'node_modules'
	  }
	}
  });

  gulp.watch('app/scripts/**/*.js', ['scripts:main']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['lint', 'html', 'fonts', 'images', 'extras'], () => {
	return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: false}));
});

gulp.task('deploy:images', () => {
	return gulp.src('dist/images/*')
		.pipe(gulp.dest('./../images'));
});
gulp.task('deploy:styles', () => {
	return gulp.src('dist/styles/**/*')
		.pipe(gulp.dest('../styles'));
});
gulp.task('deploy:scripts', () => {
	return gulp.src('dist/scripts/**/*')
		.pipe(gulp.dest('../scripts'));
});
gulp.task('deploy:fonts', () => {
	return gulp.src('dist/fonts/**/*')
		.pipe(gulp.dest('../styles/fonts'));
});

gulp.task('default', () => {
  return new Promise(resolve => {
	dev = false;
	runSequence(['clean'], ['build'], resolve);
  });
});