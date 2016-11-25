var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    header = require('gulp-header'),
    clean = require('gulp-clean');

var version = '1.0.0',
    headerComment = '/* version:' + version + ' build: ' + new Date() + '  */\n';

gulp.task('default', function() {
    return gulp.src(['src/**/*.js'])
        .pipe(concat('mqttclient.min.js'))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(header(headerComment))
        .pipe(gulp.dest('disc/js'))
});
