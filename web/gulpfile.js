var gulp = require('gulp');
var transpile = require('gulp-es6-module-transpiler');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');

gulp.task('default', ["lint", "es6"]);
gulp.task('lint', function() {
    return gulp.src('./src/**/*.js')
        .pipe(jshint({
            esnext: true
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

var babel = require('gulp-babel');

gulp.task('es6', ['cleanDist'], function() {
    return gulp.src('src/**/*es6.js')
        .pipe(babel())
        .pipe(rename(function(path) {
            path.dirname = "";
            path.basename = path.basename.replace(/\.es6/, "");
            return path;
        }))
        .pipe(gulp.dest('./dist/_js'));
});


gulp.task('cleanDist', function() {
    return gulp.src('dist/*', {
            read: false
        })
        .pipe(clean());
});
