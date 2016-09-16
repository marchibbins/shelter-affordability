import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import history from 'connect-history-api-fallback';
import modrewrite from 'connect-modrewrite';
import rename from 'gulp-rename';
import path from 'path';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

const dir = {
        source: './src',
        assets: './assets',
        build: './dist'
    },
    filenames = {
        js: {
            app: 'index.js',
            bundle: 'bundle.js'
        }
    },
    paths = {
        assets: {
            sourceFiles: path.join(dir.assets, '/**/*'),
            buildDir: path.join(dir.build)
        },
        js: {
            appFile: path.join(dir.source, filenames.js.app),
            sourceFiles: path.join(dir.source, '**/*.js'),
            buildDir: path.join(dir.build, 'js/')
        }
    };


if (gutil.env.production) {
    process.env.NODE_ENV = 'production';
}

gulp.task('assets', () => {
    gutil.log(gutil.colors.green(`Copying assets '${paths.assets.sourceFiles}'`));
    return gulp.src(paths.assets.sourceFiles)
        .pipe(gulp.dest(paths.assets.buildDir));
});

gulp.task('bundle', () => {
    gutil.log(gutil.colors.green(`Bundling '${paths.js.appFile}'`));
    return browserify(paths.js.appFile)
        .transform(babelify, {
            presets: ['es2015', 'react']
        })
        .bundle()
        .on('error', function (err) {
            gutil.log(gutil.colors.red(err.toString()));
            this.emit('end');
        })
        .pipe(source(filenames.js.bundle))
        .pipe(gulp.dest(paths.js.buildDir));
});

gulp.task('build', ['assets', 'js']);

gulp.task('compress', () => {
    gutil.log(gutil.colors.green(`Compressing '${paths.js.buildDir + filenames.js.bundle}'`));
    return gulp.src(paths.js.buildDir + filenames.js.bundle)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.js.buildDir));
});

gulp.task('js', (callback) => {
    sequence('lint', 'bundle', 'compress', callback);
});

gulp.task('lint', () => {
    gutil.log(gutil.colors.green(`Linting '${paths.js.sourceFiles}'`));
    return gulp.src(paths.js.sourceFiles)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('serve', () => {
    connect.server({
        middleware: function () {
            return [
                history(),
                modrewrite([
                    '^(.*?)\.min\.js$ $1.js'
                ])
            ];
        }
    });
});

gulp.task('watch', () => {
    gutil.log(gutil.colors.green(`Watching '${paths.js.sourceFiles}' for changes`));
    gulp.watch(paths.js.sourceFiles, ['bundle']);
});

gulp.task('default', ['build']);
