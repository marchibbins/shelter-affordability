const gulp = require('gulp'),
    babel = require('gulp-babel'),
    eslint = require('gulp-eslint'),
    plumber = require('gulp-plumber');

gulp.task('js', () => {
    return gulp.src('./src/app.js')
        .pipe(plumber())
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('lint', () => {
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('watch', () => {
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['js']);
