// Uglify JS bundle

const uglify = require('gulp-uglify');


gulp.task('uglify:js', function() {
    return gulp
        .src('public/dist/js/app.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('public/dist/js'));
});