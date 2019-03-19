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

const webpack_config = require('./webpack.config');

// Компиляция scss-кода в main.css

gulp.task('sass', () => {
    return gulp.src('./src/sass/main.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(mmq({
                   log: true
               }))
               .pipe(gulp.dest('./build/static'))
               .pipe(browserSync.stream());
});

// Копирование некомпилируемых шаблонов

gulp.task('templates', () => {
    return gulp.src('./src/templates/**/*')
               .pipe(gulp.dest('build/templates'))
               .pipe(browserSync.stream());
});

// Прекомпиляция клиентских шаблонов

gulp.task('precompile', () => {
    return gulp.src('./src/templates-client/**/*.pug')
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
          .pipe(gulp.dest('./src/frontend/views/templates'));
  });

gulp.task('bundle', () => {
    return gulp.src('./src/frontend/main.js')
               .pipe(webpack_stream(webpack_config), webpack)
               .pipe(gulp.dest('./build/static'))
               .pipe(browserSync.stream());
});

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

gulp.task('clean', () => {
    return del('./build/**/*');
});


gulp.task('all', gulp.series('clean', 'assets', 'templates', 'sass', 'server', 'game', 'app', 'precompile', 'bundle'));

gulp.task('default', () => {

    //gulp.task('all')();

    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    
    gulp.watch('./src/sass', gulp.series('sass'));
    gulp.watch('./src/templates', gulp.series('templates'));
    gulp.watch('./src/templates-client', gulp.series('precompile', 'bundle'));
    gulp.watch('./src/frontend', gulp.series('bundle'));
    gulp.watch('./src/server', gulp.series('server'));
    gulp.watch('./src/game', gulp.series('game'));
    gulp.watch('./src/app.js', gulp.series('app'));
});
