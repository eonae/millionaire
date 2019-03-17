'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const mmq = require('gulp-merge-media-queries')
const del = require('del');
const rigger = require('gulp-rigger');
const htmlval = require('gulp-htmlhint');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const webpack_stream = require('webpack-stream');
const path = require('path');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const defineModule = require('gulp-define-module');
const concat = require('gulp-concat');
const wrap = require('gulp-wrap');
const webpack = require('webpack');
const foreach = require('gulp-foreach');
const ins = require('gulp-insert');
const replace = require('gulp-replace');
const prettier = require('gulp-prettier');
const pug = require('gulp-pug');

const paths = require('./paths');
const webpack_config = require('./webpack.config');


gulp.task('sass', () => {
    return gulp.src(paths.sass_src + '/main.scss')
               .pipe(sass().on('error', sass.logError))
               .pipe(mmq({
                   log: true
               }))
               .pipe(gulp.dest(paths.css_build))
               .pipe(browserSync.stream());
});

gulp.task('html', () => {
    return gulp.src(`${paths.html_src}/*.html`)
               .pipe(rigger())
               .pipe(htmlval())
               .pipe(htmlval.failAfterError())
               .pipe(gulp.dest(paths.html_build))
               .pipe(browserSync.stream());
});

gulp.task('libs', () => {
    return gulp.src(paths.libs_src + '/*.js')
               .pipe(gulp.dest(paths.libs_build));
});

gulp.task('pug-precompile', () => {
    return gulp.src('./src/frontend/pug-client/**/*.pug')
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
          .pipe(gulp.dest('./src/frontend/js/views/templates'));
  });


gulp.task('js', () => {
    return gulp.src(`${paths.js_src}/app.js`)
               .pipe(eslint())
               .pipe(eslint.format())
               //.pipe(eslint.failAfterError())
            //    .pipe(babel({
            //        presets: ['@babel/env']
            //    }))
               .pipe(webpack_stream(webpack_config), webpack)
               .pipe(gulp.dest(paths.js_build))
               .pipe(browserSync.stream());
});

gulp.task('assets', () => {
    return gulp.src(`${paths.assets_src}/**/*`)
               .pipe(gulp.dest(paths.assets_build));
});

gulp.task('server', () => {
    return gulp.src(`${paths.back_src}/**`)
               //.pipe(eslint())
               //.pipe(eslint.format())
               //.pipe(eslint.failAfterError())
               //.pipe(babel({
               //     presets: ['@babel/env']
               //}))
               .pipe(gulp.dest(paths.back_build));
});


gulp.task('clean', () => {
    return del([`${paths.build}/**/*`, `!${paths.build}`])
});

gulp.task('all', gulp.series('clean', 'assets', 'sass', 'html', 'pug-precompile', 'js', 'libs', 'server'));

gulp.task('default', () => {
    gulp.task('all')();
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    
    gulp.watch(paths.sass_src, gulp.series('sass'));
    gulp.watch(paths.html_src, gulp.series('html'));
    gulp.watch(paths.js_src, gulp.series('js'));
    gulp.watch(paths.back_src, gulp.series('server'));
    gulp.watch(paths.templates_src, gulp.series('pug-precompile', 'js'));
});
