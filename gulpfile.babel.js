import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import rename from 'gulp-rename';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

gulp.task('bundle', () => {
    gutil.log(gutil.colors.green('Bundling \'./src/app.js\''));
    return browserify('./src/app.js')
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err.toString()));
            this.emit('end');
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('compress', () => {
    gutil.log(gutil.colors.green('Compressing \'./dist/bundle.js\''));
    return gulp.src('./dist/bundle.js')
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('js', (callback) => {
    // TODO: This produces a minified development version of React,
    // set process.env.NODE_ENV = 'production' before bundle.
    sequence('lint', 'bundle', 'compress', callback);
});

gulp.task('lint', () => {
    gutil.log(gutil.colors.green('Linting \'./src/**/*.js\''));
    return gulp.src('./src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('serve', () => {
    connect.server();
});

gulp.task('watch', () => {
    gutil.log(gutil.colors.green('Watching \'./src/**/*.js\' for changes'));
    gulp.watch('./src/**/*.js', ['js']);
});

gulp.task('default', ['js']);
