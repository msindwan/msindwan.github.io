/**
 * Reduxion Gulpfile
 *
 * @Author : Mayank Sindwani
 * @Date   : 2016-12-22
 *
 * Description : Tasks for building the reduxion example.
 **/

import source from 'vinyl-source-stream';
import gplugins from 'gulp-load-plugins';
import babel from 'babel-core/register';
import webserver from 'gulp-webserver';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import babelify from 'babelify';
import watchify from 'watchify';
import help from 'gulp-help';
import tasks from 'gulp';
import del from 'del';

let gulp = help(tasks);
let plugins = gplugins();

const config = {
    build: 'example/dist',
    sass: 'example/src/',
    javascript: {
        entry: 'example/src/javascript/app.jsx',
        files: 'example/src/javascript/**/*.{js,jsx}',
        src: 'src/**/*.{js,jsx}'
    },
    sass: {
        entry: 'example/src/sass/app.scss',
        files: 'example/src/sass/**/*.scss'
    }
};

gulp.task('js', 'Builds the javascript files.', () => {

    // Bundles the javascript into a single module.
    let b = browserify({
      cache: {},
      debug: true,
      entries: config.javascript.entry,
      extensions: ['.js', '.jsx'],
      fullPaths: false,
      packageCache: {},
      transform: [ babelify ]
    });

    const bundle = function (files) {

        plugins.util.log("Starting '" + plugins.util.colors.cyan('browserify') + "' "
            + plugins.util.colors.magenta((files ? ' => ' + files : '')));

        return b.bundle()
            .on('error', function (err) {
                plugins.util.log(plugins.util.colors.red(err.message));
                this.emit('end');
            })
            .pipe(source('app.js'))
            .pipe(buffer())
            // Map bundled files to their original source code.
            .pipe(plugins.sourcemaps.init({loadMaps: true}))
            // Output the result to the distribution folder.
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(config.build))
    };

    // Rebunde the javascript on update.
    b = watchify(b)
    .on('update', bundle)
    .on('log', function (msg) {
        plugins.util.log("Finished '" + plugins.util.colors.cyan('browserify') + "' " + msg);
        plugins.util.log("Reload the browser to view changes.");
    });

    return bundle();
});

gulp.task('css', 'Builds the css files.', () => {
    return gulp.src(config.sass.entry)
        .pipe(plugins.sass({
            includePaths: ['node_modules/bootstrap-sass/assets/stylesheets', 'node_modules/font-awesome/scss', config.sassDirectory]
        }))
        .on('error', function (err) {
            plugins.util.log(plugins.util.colors.red(err.message));
            this.emit('end');
        })
        .pipe(gulp.dest(config.build));
});

gulp.task('lint', 'Lints all of the modules', () => {
    // Run eslint on the provided js(x) files.
    return gulp.src(config.javascript.src)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError());
});

gulp.task('clean', 'Cleans the build folder', (cb) => {
   // Delete the build folder.
   return del(
      config.build, cb
   );
});

gulp.task('default', 'Builds all of the modules.', ['js', 'css'], () => {
    gulp.src('./example')
        .pipe(webserver({
            fallback: 'index.html'
        }));

    return gulp.watch(
        config.sass.files, ['css']
    );
});
