const del = require('del');

gulp.task('clean:dist', function () {
    return del('dist/');
});

