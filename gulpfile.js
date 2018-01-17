const gulp = require('gulp');
const concat = require('gulp-concat');
gulp.task('concat', () => {
  return gulp.src(
    [
      './node_modules/jquery/dist/jquery.min.js',
      './node_modules/lodash/lodash.min.js',
      './node_modules/gsap/src/minified/TweenMax.min.js',
      './node_modules/hammerjs/hammer.min.js',
      './node_modules/moment/min/moment.min.js',
      './dist/codenut.min.js',
    ]
  )
    .pipe(concat('codenut-with-libs.min.js'))
    .pipe(gulp.dest('./dist/'));
});