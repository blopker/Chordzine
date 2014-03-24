'use strict';

var gulp = require('gulp');

// Load plugins
var $ = require('gulp-load-plugins')();


// Styles
gulp.task('styles', function () {
    return gulp.src('app/styles/main.scss')
        .pipe($.sass())
        .pipe(gulp.dest('dist/styles'))
        .pipe($.size())
        .pipe($.connect.reload());
});

gulp.task('lint-scripts', function() {
    gulp.src('app/scripts/**/*.js')
        .pipe($.jshint('.jshintrc'))
        .pipe($.jshint.reporter('default'))
});

// Scripts
gulp.task('scripts', ['lint-scripts'], function () {
    return gulp.src('app/scripts/tesstie')
        .pipe($.browserify())
        .pipe(gulp.dest('dist/scripts'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// HTML
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(gulp.dest('dist'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        }))
        .pipe(gulp.dest('dist/images'))
        .pipe($.size())
        .pipe($.connect.reload());
});

// Clean
gulp.task('clean', function () {
    return gulp.src('dist', {read: false}).pipe($.clean());
});

// Bundle
gulp.task('bundle', ['styles', 'scripts']);

// Build
gulp.task('build', ['html', 'bundle', 'images']);

// Default task
gulp.task('default', ['clean', 'build']);

// Connect
gulp.task('connect', $.connect.server({
    root: ['dist'],
    port: 9000,
    livereload: true
}));

gulp.task('json', function() {
    gulp.src('app/scripts/json/**/*.json')
        .pipe(gulp.dest('dist/json/'));
});


// Watch
gulp.task('watch', ['html', 'bundle', 'connect'], function () {

    // Watch .json files
    gulp.watch('app/json/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    // Watch .scss files
    gulp.watch('app/styles/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('app/scripts/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('app/images/**/*', ['images']);
});
