import gulp from 'gulp';
import babelify from 'babelify';
import browserify from 'browserify';
import connect from 'gulp-connect';
import eslint from 'gulp-eslint';
import gutil from 'gulp-util';
import history from 'connect-history-api-fallback';
import minifyCSS from 'gulp-minify-css';
import modrewrite from 'connect-modrewrite';
import rename from 'gulp-rename';
import path from 'path';
import sass from 'gulp-sass';
import sequence from 'run-sequence';
import source from 'vinyl-source-stream';
import uglify from 'gulp-uglify';

const dir = {
        sourceJs: './src/js/',
        sourceCss: './src/css/',
        assets: './assets',
        build: './dist'
    },
    filenames = {
        css: {
            app: 'main.scss',
            bundle: 'bundle.css'
        },
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
        css: {
            appFile: path.join(dir.sourceCss, filenames.css.app),
            sourceFiles: path.join(dir.sourceCss, '**/*.scss'),
            buildDir: path.join(dir.build, 'css/')
        },
        js: {
            appFile: path.join(dir.sourceJs, filenames.js.app),
            sourceFiles: path.join(dir.sourceJs, '**/*.js'),
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

gulp.task('build', (callback) => {
    let tasks = ['assets', 'js', 'css'];
    if (gutil.env.production) {
        tasks.push('uglifyJs', 'minifyCss');
    }
    sequence(...tasks, callback);
});

gulp.task('css', () => {
    gutil.log(gutil.colors.green(`Bundling '${paths.css.appFile}'`));
    return gulp.src(paths.css.appFile)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(filenames.css.bundle))
        .pipe(gulp.dest(paths.css.buildDir));
});

gulp.task('js', ['lint', 'bundle']);

gulp.task('lint', () => {
    gutil.log(gutil.colors.green(`Linting '${paths.js.sourceFiles}'`));
    return gulp.src(paths.js.sourceFiles)
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('minifyCss', () => {
    gutil.log(gutil.colors.green(`Compressing '${paths.css.buildDir + filenames.css.bundle}'`));
    return gulp.src(paths.css.buildDir + filenames.css.bundle)
        .pipe(minifyCSS())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.css.buildDir));
});

gulp.task('serve', () => {
    connect.server({
        middleware: function () {
            return [
                history(),
                modrewrite([
                    '^(.*?)\.min\.css$ $1.css',
                    '^(.*?)\.min\.js$ $1.js'
                ])
            ];
        }
    });
});

gulp.task('uglifyJs', () => {
    gutil.log(gutil.colors.green(`Compressing '${paths.js.buildDir + filenames.js.bundle}'`));
    return gulp.src(paths.js.buildDir + filenames.js.bundle)
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.js.buildDir));
});

gulp.task('watch', () => {
    gutil.log(gutil.colors.green(`Watching '${paths.css.sourceFiles}'`
        + ` and '${paths.js.sourceFiles}' for changes`));
    gulp.watch(paths.css.sourceFiles, ['css']);
    gulp.watch(paths.js.sourceFiles, ['bundle']);
});

gulp.task('default', ['build']);
