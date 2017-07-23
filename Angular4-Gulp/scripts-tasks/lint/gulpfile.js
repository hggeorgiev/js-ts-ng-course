const gulp = require('gulp');
const tslint = require('gulp-tslint');
// Lint Typescript
gulp.task('lint:ts', function() {
    return gulp.src('src/**/*.ts')
        .pipe(tslint())
        .pipe(tslint.report({ formatter: "verbose" }));
});
