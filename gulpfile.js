// Include gulp
var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var del = require('del');

// Lint Task
gulp.task('lint', function(){
    return gulp.src([
        './_template/**/*.js',
        './public/app/**/*.js'
    ])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Watch Files For Changes
gulp.task('watch-templates', function(){
    gulp.watch(['public/app/**/*'], ['template-cache']);
});
gulp.task('watch-modules', function(){
    gulp.watch('_template/module/**/*', ['template-modules']);
});
gulp.task('template-cache', function(){
  return gulp.src('public/app/**/*.html')
        .pipe(templateCache({
            root: 'app/',
            filename: 'template-cache.js', 
            module: 'tower'
        }))
        .pipe(prettify())
        .pipe(gulp.dest('public/app'));
});
gulp.task('template-modules', function(){
  return gulp.src('_template/module/**/*.html')
        .pipe(templateCache({
            root: '_template/module/',
            filename: 'template-modules.js', 
            module: 'tower'
        }))
        .pipe(prettify())
        .pipe(gulp.dest('public/app'));
});

// Default Task
gulp.task('default', [
    'template-cache', 
    'template-modules',
    'watch-templates', 
    'watch-modules'
]);