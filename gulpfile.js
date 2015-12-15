var gulp       = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel      = require('gulp-babel')
var del        = require('del')
var spawn      = require('child_process').spawn;
var gutil      = require('gulp-util');
var path       = require('path');

var paths = {
  src: 'src',
  dest: 'dist'
}
