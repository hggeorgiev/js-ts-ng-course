const cleanCSS = require('gulp-clean-css');

gulp.task('minify:css', function() {
    // concat and minify global css files
    gulp
        .src('css/*.css')
        .pipe(concat('global.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/global'));

});