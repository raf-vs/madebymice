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
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('themes/madebymice/static/assets/images/'));
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
                  'src/assets/javascript/vendor/_jquery.fancybox.js',
                  'src/assets/javascript/vendor/_ziehharmonika.js',
                  'src/assets/javascript/vendor/_jpages.js',
                  'src/assets/javascript/vendor/_responsive-nav.js',                  
                  'src/assets/javascript/main.js'
                  ])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('scripts.js'))
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
  }).pipe(gulp.dest('static'));
});

gulp.task('build', ['images','styles','scripts','extras', 'translate'], () => {
  return gulp.src('static/**/*');
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("src/assets/styles/**/*.scss", ['styles']);
  gulp.watch("src/assets/javascript/**/*.js", ['scripts']);
  gulp.watch("src/admin/*.yml", ['admin']);
  gulp.watch("cms/**/*.md", ['translate']);
  gulp.watch("cms/**/*.yml", ['translate']);
  // gulp.watch("*.html", ['bs-reload']);
});