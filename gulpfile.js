/**
 * Created by RENATO on 12/12/2015.
 */
//process.env.BROWSERIFYSHIM_DIAGNOSTICS=1
var gulp = require('gulp');

var browserSync = require('browser-sync').create();
var sourceMaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var jshint = require('gulp-jshint');
var less = require('gulp-less');

gulp.task('default', ['scripts','styles','serve'], function () {
    gulp.watch('**/*.html', browserSync.reload);
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });
});

gulp.task('scripts', function() {
    var b = browserify({
        entries: 'src/scripts/main.js',
        debug: true,
        transform: ['brfs']
    });

    //b.transform('brfs');

    b.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourceMaps.init({loadMaps: true}))
        //.pipe(uglify())
        .pipe(sourceMaps.write('./'))
        .pipe(gulp.dest('dist/scripts/'))
        .pipe(browserSync.stream());
});

gulp.task('lint', function(){
    gulp.src(['src/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
});

gulp.task('styles', function(){
    gulp.src(['src/styles/main.less'])
        .pipe(sourceMaps.init())
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(minifyCss())
        .pipe(sourceMaps.write())
        .pipe(gulp.dest('dist/styles'))
        .pipe(browserSync.stream());
});

