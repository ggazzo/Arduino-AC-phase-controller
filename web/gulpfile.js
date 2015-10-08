var gulp = require('gulp');
var transpile = require('gulp-es6-module-transpiler');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');

gulp.task('default', ["lint", "es6","nw"]);
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
    return gulp.src('app/src/**/*es6.js')
        .pipe(babel())
        .pipe(rename(function(path) {
            path.dirname = "";
            path.basename = path.basename.replace(/\.es6/, "");
            return path;
        }))
        .pipe(gulp.dest('dist/_js'));
});


gulp.task('cleanDist', function() {
    return gulp.src(['dist/*'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('copy', function() {
   return gulp.src('package.json')
   .pipe(gulp.dest('dist/'));
});

gulp.task('nw',["copy"], function () {

    var nw = new NwBuilder({
        version: '0.11.0',
        files: './dist/**',
        macIcns: './icon.ico',
        macPlist: {mac_bundle_id: 'myPkg'},
        platforms: ['win32', 'win64'/*, 'osx32', 'osx64'*/]
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('nw-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('nw-builder', err);
    });
});
