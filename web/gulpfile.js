var gulp = require('gulp');
var transpile = require('gulp-es6-module-transpiler');
var rename = require("gulp-rename");
var clean = require('gulp-clean');
var jshint = require('gulp-jshint');
var NwBuilder = require('nw-builder');
var gutil = require('gulp-util');
var jade = require('jade');
var sass = require('gulp-sass');
var gulpJade = require('gulp-jade');
var concat = require('gulp-concat');
var gulpSequence = require('gulp-sequence');

gulp.task('default', ['nw']);
var browserify = require('gulp-browserify');

// // Basic usage
gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('./app/bower_components/**')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(gulp.dest('./dist/_js'))
});


gulp.task("all", gulpSequence(["lint", 'cleanDist'], "es6", "jade", "sass", "img", "copy","bower"));

gulp.task('lint', function() {
    return gulp.src('app/src/**/*.js')
        .pipe(jshint({
            esnext: true
        }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});
gulp.task('watch', function() {
    gulp.watch(['!dist/**', '**/*.{js,png}'], ['default']);
});
gulp.task('img', function() {
    return gulp.src('app/src/_img/*')
        .pipe(gulp.dest('dist/_img'));
});

gulp.task('scripts', function() {
    return gulp.src('dist/**/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('dist/_js'));
});
gulp.task('sass', function() {
    return gulp.src('app/src/_scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('dist/_css'));
});

var babel = require('gulp-babel');

gulp.task('es6', function() {
    return gulp.src('app/src/_js/*es6.js')
        .pipe(babel({
            "modules": "common"
        }))
        .pipe(rename(function(path) {
            path.dirname = "";
            path.basename = path.basename.replace(/\.es6/, "");
            return path;
        }))
        //.pipe(concat('all.js'))
        .pipe(gulp.dest('dist/_js'));
});

gulp.task('js', function() {
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
    return gulp.src(['dist'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('bower', function() {
    return gulp.src(["./app/bower_components/**"])
        .pipe(gulp.dest('dist/bower_components/'));
});

gulp.task('copy', function() {
    return gulp.src(['package.json','app/bower.json'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('nw', ['all', "copy"], function() {

    var nw = new NwBuilder({
        version: '0.11.0',
        files: ['./dist/**'],
        macIcns: './icon.ico',
        macPlist: {
            mac_bundle_id: 'myPkg'
        },
        platforms: ['win32', 'win64', 'linux32', 'linux64' /*, 'osx32', 'osx64'*/ ]
    });

    // Log stuff you want
    nw.on('log', function(msg) {
        gutil.log('nw-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function(err) {
        gutil.log('nw-builder', err);
    });
});

gulp.task('jade', function() {
    return gulp.src('app/src/_templates/**/*.jade')
        .pipe(gulpJade({
            jade: jade,
            pretty: true
        }))
        .pipe(gulp.dest('dist/_html'))

})
