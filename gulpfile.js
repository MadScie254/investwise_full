const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

// Compile Sass
gulp.task('sass', function() {
  return gulp.src('./assets/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream());
});

// Minify JS
gulp.task('scripts', function() {
  return gulp.src('./assets/js/**/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
    .pipe(browserSync.stream());
});

// Watch & Serve
gulp.task('serve', function() {
  browserSync.init({
    server: './pages'
  });

  gulp.watch('./assets/css/**/*.scss', gulp.series('sass'));
  gulp.watch('./assets/js/**/*.js', gulp.series('scripts'));
  gulp.watch('./pages/**/*.html').on('change', browserSync.reload);
});

// Default Task
gulp.task('default', gulp.series('sass', 'scripts', 'serve'));
