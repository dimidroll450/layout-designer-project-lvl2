'use strict'
const { src, dest, series, watch } = require('gulp');

const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');

sass.compiler = require('node-sass');

const paths = {
  scss: './src/scss/*.{scss, sass}',
  copy: './src/*.html',
}
 
const scssTask = () => (
  src(paths.scss)
    .pipe(sass())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(dest('./dist/css'))
);

const copyFiles = () => src(paths.copy)
  .pipe(dest('./dist'))

const watchTask = () => {
  watch(paths.scss, ['sass']);
}

exports.default = series(
  scssTask,
  copyFiles,
)