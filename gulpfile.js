'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const mmq = require('gulp-merge-media-queries')
const del = require('del');
const webpack_stream = require('webpack-stream');
const path = require('path');
const browserSync = require('browser-sync').create();
const defineModule = require('gulp-define-module');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const webpack = require('webpack');
const foreach = require('gulp-foreach');
const ins = require('gulp-insert');
const replace = require('gulp-replace');
const prettier = require('gulp-prettier');
const pug = require('gulp-pug');
const extract = require('./gulp-eonae-extract');
const debug = require('gulp-debug');
const ext_replace = require('gulp-ext-replace');
const filter = require('gulp-filter');

const webpack_config = require('./webpack.config');

const vueFilter = filter('**/*.vue', { restore: true });

// Компиляция scss-кода в main.css

gulp.task('precompile', () => {
  return gulp.src(['./src/frontend/views/components/**/*.vue',
                   './src/frontend/views/components/**/*.pug',
                   './src/frontend/vendor/**/*.pug'])
            .pipe(vueFilter)
            .pipe(extract('<template lang=\\"pug\\">','<\\/template>'))
            .pipe(ext_replace('.pug'))
            .pipe(vueFilter.restore)
            .pipe(
              foreach(
                (stream, file) => {
                  console.log(file.path)
                  return stream
                    .pipe(pug({
                      client: true,
                      pretty: true,
                      compileDebug: false,
                      debug: false,
                      inlineRuntimeFunctions: false,
                      name: 'render_' + path.basename(file.path, '.pug')
                    }))
                    .pipe(replace(/function\s([a-zA-z0-9\_\$]+)/g, (match, name) => {
                      return name + ': function';
                    }))
                }
              )
            )
            .pipe(concat('templates.js', {
              newLine: ','
            }))
            .pipe(wrap('{ <%= contents %> }\n\r'))
            .pipe(defineModule('es6'))
            .pipe(ins.prepend("import pug from 'vendor/pug-runtime-es6'\n\r"))
            .pipe(prettier())
            .pipe(gulp.dest('./src/frontend/views'));
});

gulp.task('prepare-sass', () => {
  return gulp.src(['./src/frontend/views/components/**/*.vue', './src/frontend/views/components/**/*.scss'])
            .pipe(vueFilter)
            .pipe(extract('<style lang=\\"scss\\">','<\\/style>'))
            .pipe(ext_replace('.scss'))
            .pipe(vueFilter.restore)
            .pipe(gulp.dest('./src/frontend/views/sass/temp'));
});

gulp.task('sass', () => {
  return gulp.src('./src/frontend/views/sass/main.scss')
            .pipe(sass().on('error', sass.logError))
            .pipe(mmq({
                log: true
            }))
            .pipe(gulp.dest('./build/static'))
            .pipe(browserSync.stream());
});

gulp.task('bundle', () => {
  return gulp.src('./src/frontend/main.js')
              .pipe(webpack_stream(webpack_config), webpack)
              .pipe(gulp.dest('./build/static'))
              .pipe(browserSync.stream());
});

// Copying /////////////////////////////////////////

gulp.task('assets', () => {
  return gulp.src('./src/assets/**/*')
              .pipe(gulp.dest('./build/static'));
});

gulp.task('server', () => {
  return gulp.src('./src/server/**/*')
              .pipe(gulp.dest('./build/server'));
});

gulp.task('game', () => {
  return gulp.src('./src/game/**/*')
             .pipe(gulp.dest('./build/game'));
});

gulp.task('app', () => {
  return gulp.src('./src/app.js')
             .pipe(gulp.dest('./build'));
});

// Copying /////////////////////////////////////////

gulp.task('clean', () => {
  return del('./build/**/*');
});

gulp.task('all-sass', gulp.series('prepare-sass', 'sass'));
gulp.task('all-js', gulp.series('precompile', 'bundle'));
gulp.task('')

gulp.task('all', gulp.series('clean', 'assets', 'server', 'game', 'app', 'all-sass', 'all-js', ));

gulp.task('default', () => {

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    
    gulp.watch('./src/frontend/views/sass/**/*.scss', gulp.series('sass'));
    gulp.watch('./src/frontend/views/components/**/*.vue', gulp.series(['prepare-sass', 'precompile']));
    gulp.watch('./src/frontend/**/*.js', gulp.series('bundle'));

    gulp.watch('./src/server', gulp.series('server'));
    gulp.watch('./src/game', gulp.series('game'));
    gulp.watch('./src/app.js', gulp.series('app'));
});

