const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync').create();
const del = require('del');
const runSequence = require('run-sequence');
const $ = gulpLoadPlugins();
const reload = browserSync.reload;

$.spritesmith = require('gulp.spritesmith');

let dev = true;

gulp.task('sprite', () => {
	var data = gulp.src('app/images/icons/*.*')
	  .pipe($.spritesmith({
		/* this whole image path is used in css background declarations */
		imgName: '../images/icons/sprite.png',
		cssName: '_sprite.scss'
	  }));
	if (dev) {
		data.css.pipe(gulp.dest('app/styles/components'));
		data.css.pipe(gulp.dest('.tmp/styles/components'));
		data.img.pipe(gulp.dest('.tmp/images'));
	}
	// else {
	// 	data.css.pipe(gulp.dest('dist/styles'));
	// 	data.img.pipe(gulp.dest('dist/images'));
	// }
});

gulp.task('views', () => {
  gulp.src('app/views/*.pug')
	.pipe($.pug({
	  pretty: true
	}))
	.pipe($.plumber())
	.pipe($.htmlmin({
	  collapseWhitespace: true,
	  removeComments: true
	}))
	.pipe($.if(dev, gulp.dest('.tmp/'), gulp.dest('dist/')))
	.pipe($.size({title: 'pug'}))
	.pipe(reload({stream: true}));
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

gulp.task('scripts', () => {
  return gulp.src('app/scripts/main.js')
	.pipe($.plumber())
	.pipe($.uglify())
	.pipe($.babel())
	.pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	.pipe(reload({stream: true}));
});

gulp.task('scripts:slideNav', () => {
  return gulp.src('app/scripts/slideNav.min.js')
	.pipe($.plumber())
	.pipe($.babel())
	.pipe($.if(dev, gulp.dest('.tmp/scripts'), gulp.dest('dist/scripts')))
	.pipe(reload({stream: true}));
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

gulp.task('html', ['styles', 'scripts', 'views'], () => {
  return gulp.src('.tmp/*.html')
	.pipe($.useref({searchPath: ['.tmp', '.']}))
	.pipe($.if(/\.js$/, $.uglify({compress: {drop_console: true}})))
	.pipe($.if(/\.css$/, $.cssnano({safe: true, autoprefixer: false})))
	.pipe(gulp.dest('dist'));
});

gulp.task('images', () => {
  return gulp.src('app/images/*')
	.pipe($.cache($.imagemin()))
	.pipe($.if(dev, gulp.dest('.tmp/images')))
});

gulp.task('svg', () => {
  return gulp.src('app/favico.ico')
	.pipe($.if(dev, gulp.dest('.tmp/images/svg'), gulp.dest('dist/images/svg')))
});

gulp.task('favico', () => {
  return gulp.src('app/images/svg/*.svg')
	.pipe($.if(dev, gulp.dest('.tmp/images/svg'), gulp.dest('dist/images/svg')))
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
	runSequence(['clean'], ['views'], ['sprite'], ['styles', 'scripts'], () => {
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

	gulp.watch('app/images/icons/*', ['sprite', reload]);
	gulp.watch('app/views/**/*.pug', ['views', reload]);
	gulp.watch(['app/styles/**/*.scss', '!app/styles/components/_sprite.scss',], ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
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

gulp.task('serve:test', ['scripts'], () => {
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

  gulp.watch('app/scripts/**/*.js', ['scripts']);
  gulp.watch(['test/spec/**/*.js', 'test/index.html']).on('change', reload);
  gulp.watch('test/spec/**/*.js', ['lint:test']);
});

gulp.task('build', ['lint', 'html', 'scripts:slideNav', 'images', 'extras', 'svg'], () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: false}));
});

gulp.task('default', () => {
  return new Promise(resolve => {
	dev = false;
	runSequence(['clean'],['sprite'], 'build', resolve);
  });
});