const runSequence = require('run-sequence');

gulp.task('scripts', function(callback) {
    runSequence('lint:ts', 'compile:ts', 'bundle:js', 'uglify:js', callback);
});