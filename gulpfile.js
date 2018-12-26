var gulp = require ('gulp'),
    sass = require ('gulp-sass'),
    browserSync = require ('browser-sync'),
    concat = require ('gulp-concat'),
    uglify = require ('gulp-uglifyjs'),
    cssnano = require ('gulp-cssnano'),
    rename = require ('gulp-rename'),
    del = require ('del'),
    imagemin = require ('gulp-imagemin'),
    pngquant = require ('imagemin-pngquant'),
    cache = require ('gulp-cache'),
    autoprefixer = require ('gulp-autoprefixer'),
    uncss = require ('gulp-uncss');


// gulp.task ('mytask', function () {
//   return gulp.src ('source-files')
//   .pipe (plugin())
//   .pipe (gulp.dest('folder'))
// });


gulp.task ('sass-compile', function () {
  return gulp.src ('app/sass/**/*.sass')
  .pipe (sass ())
  // .pipe (cache (uncss ({
  //     html: ['app/css/**.css', 'app/**/*.html']
  // })))
  .pipe (autoprefixer (['last 15 versions', '> 1%', 'ie 8', 'ie 7'], {cascade: true}))
  .pipe (gulp.dest ('app/css'))
  .pipe (browserSync.reload ({
    stream: true
  }))
});


gulp.task ('browser-sync', function () {
  browserSync ({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});


gulp.task ('scriptez', function () {
  return gulp.src ([
    'app/libs/jquery/dist/jquery.min.js',
    'app/libs/magnific-popup/dist/jquery.magnific-popup.min.js',
    'app/libs/bootsrap/dist/js/bootstrap.bundle.js',
    'app/libs/slick/slick/slick.min.js',
    'app/libs/parallax-js/dist/parallax.js',
  ])
  .pipe (concat ('libs.min.js'))
  .pipe (uglify ())
  .pipe (gulp.dest ('app/js'));
});


gulp.task ('css-libs', ['sass-compile'], function () {
  return gulp.src ('app/css/libs.css')
  .pipe (cssnano ())
  .pipe (rename ({
    suffix: '.min'
  }))
  .pipe (gulp.dest ('app/css'));
});


gulp.task ('clean', function () {
  return del.sync ('dist');
});


gulp.task ('cache-clear', function () {
  return cache.clearAll;
});


gulp.task ('image', function () {
  return gulp.src ('app/img/**/*')
  .pipe (cache (imagemin ({
    interlaced: true,
    progressive: true,
    svgoPlugins: [{removeViewBox: false}],
    use: [pngquant ()]
  })))
  .pipe (gulp.dest ('dist/img'));
});


gulp.task ('watch', ['browser-sync', 'css-libs', 'scriptez'], function () {
  gulp.watch ('app/sass/**/*.sass', ['sass-compile']);
  gulp.watch ('app/*.html', browserSync.reload);
  gulp.watch ('app/js/**/*.js', browserSync.reload);
});


gulp.task ('build', ['clean', 'image', 'sass-compile', 'scriptez'], function () {
  var buildCss = gulp.src ([
    'app/css/reset.css',
    'app/css/fonts.css',
    'app/css/specific.css',
    'app/css/adaptive.css',
    'app/css/libs.min.css',
    'app/css/style.css',
  ])
  .pipe (gulp.dest ('dist/css'));
  var buildFonts = gulp.src ('app/fonts/**/*')
  .pipe (gulp.dest ('dist/fonts'));
  var buildJs = gulp.src ('app/js/**/*')
  .pipe (gulp.dest ('dist/js'));
  var buildHtml = gulp.src ('app/*.html')
  .pipe (gulp.dest ('dist'));
});


gulp.task ('default', function () {
  console.log ('Gulp Ready for Work');
});
