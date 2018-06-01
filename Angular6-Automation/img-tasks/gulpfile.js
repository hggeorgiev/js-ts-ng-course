gulp.task('copy:img', function() {
    return gulp.src('img/*')
        .pipe(gulp.dest('public/img'))
});