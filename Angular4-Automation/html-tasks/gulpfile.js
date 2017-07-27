// Copy index.html to the 'public' folder
gulp.task('copy:html', function () {
    return gulp.src(['index.html'])
        .pipe(gulp.dest('public'));
});
