
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const tsc = require('gulp-typescript');
const tsconfig = require('tsconfig-glob');
const tscConfig = require('./tsconfig.json');

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