
const concat = require('gulp-concat');
const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('copy:libs', function () {
    gulp.src(['node_modules/rxjs/**/*'])
        .pipe(gulp.dest('public/lib/js/rxjs'));

    // concatenate non-angular2 libs, shims & systemjs-config
    gulp.src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/es6-promise/dist/es6-promise.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'system.config.js'
    ])
        .pipe(concat('vendors.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public/lib/js'));

    // copy source maps
    gulp.src([
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/reflect-metadata/Reflect.js.map',
        'node_modules/systemjs/dist/system-polyfills.js.map'
    ]).pipe(gulp.dest('public/lib/js'))

    // gulp.src([
    //     'node_modules/bootstrap/dist/css/bootstrap.*'
    // ]).pipe(gulp.dest('public/lib/css'));

    return gulp.src(['node_modules/@angular/**/*'])
        .pipe(gulp.dest('public/lib/js/@angular'));
});