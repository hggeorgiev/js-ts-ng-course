
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const tsc = require('gulp-typescript');
const tsconfig = require('tsconfig-glob');
const tscConfig = require('./tsconfig.json');
const del = require('del');
const sysBuilder = require('systemjs-builder');
const tslint = require('gulp-tslint');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
// Compile TypeScript to JS
gulp.task('compile:ts', function () {
    return gulp
        // Add filesGlob option to compilers
        .src(tscConfig.filesGlob)
        .pipe(plumber({
            errorHandler: function (err) {
                console.error('>>> [tsc] Typescript compilation failed'.bold.green);
                this.emit('end');
            }}))
        .pipe(sourcemaps.init())
        .pipe(tsc(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

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

gulp.task('lint:ts', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report({ formatter: "verbose" }));
});




gulp.task('clean:dist', function () {
    return del('dist/');
});


gulp.task('uglify:js', function() {
    return gulp
        .src('dist/app.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));
});


gulp.task('scripts', function(callback) {
    runSequence(['lint:ts', 'clean:dist'], 'compile:ts', 'bundle:js', 'uglify:js', callback);
});

gulp.task('copy:libs', function () {
    gulp.src(['node_modules/rxjs/**/*'])
        .pipe(gulp.dest('dist/vendor/js/rxjs'));

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
        .pipe(gulp.dest('dist/vendor/js'));

    // copy source maps
    gulp.src([
        'node_modules/es6-shim/es6-shim.map',
        'node_modules/reflect-metadata/Reflect.js.map',
        'node_modules/systemjs/dist/system-polyfills.js.map'
    ]).pipe(gulp.dest('dist/vendor/js'));

    // gulp.src([
    //     'node_modules/bootstrap/dist/css/bootstrap.*'
    // ]).pipe(gulp.dest('public/lib/css'));

    return gulp.src(['node_modules/@angular/**/*'])
        .pipe(gulp.dest('dist/vendor/js/@angular'));
});



gulp.task('minify:css', function() {
    // concat and minify global css files
    gulp
        .src('css/*.css')
        .pipe(concat('global.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/global'));

});