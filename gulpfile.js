const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');

gulp.task('js', function() {
  return gulp
    .src(['./components/**/*.js', '!./components/**/*.spec.js'])
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
});

gulp.task('scss', function() {
  return gulp.src(['./components/**/*.scss']).pipe(sass()).pipe(gulp.dest('./lib'));
});

gulp.task('default', ['js', 'scss']);
