'use strict'

// === Settings ===
const settings = {
  scripts: false,
  styles: true,
  copy: false,
}

 // === Imports ===
const { src, dest, series, watch } = require('gulp');

// === Styles ===
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

// === BrowserSync ===
const browserSync = require('browser-sync').create();

sass.compiler = require('node-sass');

const paths = {
  src: {
    scss: './src/scss/**/**/*.scss',
    images: './src/images/*',
    html: './src/*.html',
  },
  dist: {
    main: './dist',
  },
}
 
const buildCSS = (done) => {
  if (!settings.styles) {
    return done();
  }

  return src('./src/scss/app.scss')
    .pipe(sass({
      outputStyle: 'expanded',
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./src/css'))
    .pipe(browserSync.stream())
};

const copyFiles = (done) => {
  if (!settings.html) {
    return done();
  }

  return src(paths.src.copy)
    .pipe(dest(paths.dist.main));
};

const watchers = () => {
  browserSync.init({
    server: {
      baseDir: './src',
      index: 'artist.html',
    },
  });

  watch(paths.src.scss, buildCSS);
  watch(paths.src.html).on('change', browserSync.reload);
}

exports.default = series(
  buildCSS,
  copyFiles,
);

exports.watch = watchers;