let gulp = require('gulp');
let pug = require('gulp-pug');
let sass = require('gulp-sass');
let postcss = require('gulp-postcss');
let rollup = require('rollup');
let resolve = require('rollup-plugin-node-resolve');
let babel = require('rollup-plugin-babel');
let browserSync = require('browser-sync').create();
gulp.task('build:pug', () => {
  return gulp.src('src/pug/**.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build:scss', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('build/css'));
});

gulp.task('build:js', () => {
  return rollup.rollup({
    input: 'src/js/main.js',
    plugins: [
      resolve(),
      babel({
        exclude: 'node_modules/**'
      }),
    ],
  }).then(bundle => {
    return bundle.write({
      file: 'build/js/main.js',
      format: 'iife'
    });
  });
});

gulp.task('build:images', () => {
  return gulp.src('src/images/**/*', {
    allowEmpty: true
  })
    .pipe(gulp.dest('build/images'));
});

gulp.task('build:resources', () => {
  return gulp.src('src/portfolio/*', {
    dot: true,
    allowEmpty: true
  })
    .pipe(gulp.dest('build'))
});

gulp.task('build', gulp.parallel(
  'build:pug',
  'build:scss',
  'build:js',
  'build:images',
  'build:resources'
));

gulp.task('serve', () => {
  browserSync.init({
    server: {
      baseDir: 'build'
    }
  });
});

gulp.task('watch', () => {
  gulp.watch('src/pug/**/*.pug', gulp.series('build:pug'));
  gulp.watch('src/scss/**/*.scss', gulp.series('build:scss'));
  gulp.watch('src/js/**/*.js', gulp.series('build:js'));
  gulp.watch('src/images/**/*', gulp.series('build:images'));
  gulp.watch(['src/fonts/**/*', 'src/fonts/**/.*'], gulp.series('build:resources'));
  gulp.watch('build/**/*').on('change', browserSync.reload);
});

gulp.task('default', gulp.series(
  'build',
  gulp.parallel(
    'serve',
    'watch'
  )
));