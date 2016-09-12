import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import source from 'vinyl-source-stream';

gulp.task('js', ['lint'], () => {
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

gulp.task('lint', () => {
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
