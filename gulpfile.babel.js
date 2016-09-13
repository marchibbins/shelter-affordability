import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import history from 'connect-history-api-fallback';
import rename from 'gulp-rename';
import path from 'path';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

const dir = {
        source: './src',
        build: './dist'
    },
    filenames = {
        js: {
            app: 'index.js',
            bundle: 'bundle.js'
        }
    },
    paths = {
        js: {
            app: path.join(dir.source, filenames.js.app),
            bundle: path.join(dir.build, filenames.js.bundle),
            source: path.join(dir.source, '**/*.js')
        }
    };

gulp.task('bundle', () => {
    gutil.log(gutil.colors.green(`Bundling '${paths.js.app}'`));
    return browserify(paths.js.app)
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err.toString()));
            this.emit('end');
        })
        .pipe(source(filenames.js.bundle))
        .pipe(gulp.dest(dir.build));
});

gulp.task('compress', () => {
    gutil.log(gutil.colors.green(`Compressing '${paths.js.bundle}'`));
    return gulp.src(paths.js.bundle)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(dir.build));
});

gulp.task('js', (callback) => {
    // TODO: This produces a minified development version of React,
    // set process.env.NODE_ENV = 'production' before bundle.
    // TODO: Then include compress in sequence.
    sequence('lint', 'bundle', 'compress', callback);
});

gulp.task('lint', () => {
    gutil.log(gutil.colors.green(`Linting '${paths.js.source}'`));
    return gulp.src(paths.js.source)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('serve', () => {
    connect.server({
        middleware: function() {
            return [history()];
        }
    });
});

gulp.task('watch', () => {
    gutil.log(gutil.colors.green(`Watching '${paths.js.source}' for changes`));
    gulp.watch(paths.js.source, ['bundle']);
});

gulp.task('default', ['js']);
