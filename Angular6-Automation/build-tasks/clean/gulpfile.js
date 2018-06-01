const del = require('del');

// Delete the 'public' folder
gulp.task('clean:public', function () {
    return del('public/');
});