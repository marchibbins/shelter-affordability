const gulp = require('gulp'),
    babel = require('gulp-babel'),
    plumber = require('gulp-plumber');

gulp.task('js', () => {
    return gulp.src('./src/app.js')
        .pipe(plumber())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['js']);
