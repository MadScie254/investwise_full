const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

gulp.task('sass', function() {
  return gulp.src('assets/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', gulp.series('sass'));
