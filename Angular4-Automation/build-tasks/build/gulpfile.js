const runSequence = require('run-sequence');

gulp.task('build', function(callback) {
    runSequence('clean:public', 'copy:libs', 'scripts', 'minify:css', 'copy:html', 'copy:img',  callback);
});