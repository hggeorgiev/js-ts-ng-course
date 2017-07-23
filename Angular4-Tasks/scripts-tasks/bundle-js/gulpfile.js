
const del = require('del');
const gulp = require('gulp');
const sysBuilder = require('systemjs-builder');

// Generate systemjs-based builds
gulp.task('bundle:js', function() {
    var builder = new sysBuilder('dist', './systemjs.config.js');
    return builder.buildStatic('app', 'dist/app.min.js')
        .then(function () {
            return del(['dist/**/*', '!dist/app.min.js']);
        })
        .catch(function(err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});