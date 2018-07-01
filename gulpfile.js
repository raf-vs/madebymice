var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename'),
    replace = require('gulp-replace');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');

gulp.task('browser-sync', function() {
  browserSync({
    open: false,
    server: {
       baseDir: "static"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/assets/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest('static/assets/images/'));
});

gulp.task('styles', function(){
  gulp.src(['src/assets/styles/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('themes/madebymice/static/assets/styles/'))
    .pipe(minifycss())
    .pipe(gulp.dest('themes/madebymice/static/assets/styles/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
  return gulp.src([
                  'src/assets/javascript/plugins/*.js',
                  'src/assets/javascript/*.js'
                  ])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('scripts.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('themes/madebymice/static/assets/javascript/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('htmlmin', () => {
  return gulp.src('public/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true,preserveLineBreaks: true,conservativeCollapse: true}))
    .pipe(gulp.dest('public/'));
});

gulp.task('extras', () => {
  return gulp.src([
    'src/**/*',
    '!src/*.html',
    '!src/**/*.kit',
    '!src/**/*.scss',
    '!src/includes'
  ], {
    dot: true
  }).pipe(gulp.dest('themes/madebymice/static/'));
});

gulp.task('build', ['images','styles','scripts','extras'], () => {
  return gulp.src('themes/madebymice/static/**/*');
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/**/*", ['extras','images']);
  gulp.watch("src/assets/styles/**/*.scss", ['styles']);
  gulp.watch("src/assets/javascript/**/*.js", ['scripts']);
});