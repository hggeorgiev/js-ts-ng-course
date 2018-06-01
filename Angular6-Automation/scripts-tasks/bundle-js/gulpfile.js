
const del = require('del');
const gulp = require('gulp');
const sysBuilder = require('systemjs-builder');

// Gather all files and compile them into a single file
gulp.task('bundle:js', function() {
    var builder = new sysBuilder('public', './systemjs.config.js');
    return builder.buildStatic('app', 'public/dist/js/app.min.js')
        .then(function () {
            return del(['public/dist/js/**/*', '!public/dist/js/app.min.js']);
        })
        .catch(function(err) {
            console.error('>>> [systemjs-builder] Bundling failed'.bold.green, err);
        });
});