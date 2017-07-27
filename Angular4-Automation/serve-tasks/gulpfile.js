const liveServer = require('gulp-live-server');

// Watch src files for changes, then trigger recompilation
gulp.task('watch:src', function() {
    gulp.watch('src/**/*.ts', ['scripts']);
    gulp.watch('src/**/*.css', ['minify:css']);
});

// Run Express, auto rebuild and restart on src changes
gulp.task('serve', ['watch:src'], function () {
    var server = liveServer.new('server.js');
    server.start();

    gulp.watch('server.js', server.start.bind(server));
});