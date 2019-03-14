'use strict';

const paths = require('./paths');

const gulp = require('gulp');
const sass = require('gulp-sass');
const mmq = require('gulp-merge-media-queries')
const del = require('del');
const rigger = require('gulp-rigger');
const htmlval = require('gulp-htmlhint');
const eslint = require('gulp-eslint');
const babel = require('gulp-babel');
const webpack = require('webpack-stream');
const path = require('path');
const browserSync = require('browser-sync').create();
const hbsPrecompile = require('gulp-precompile-handlebars');
const rename = require('gulp-rename');
const defineModule = require('gulp-define-module');
const concat = require('gulp-concat');

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

gulp.task('templates', () => {
    // `${paths.templates_src}*.hbs`
    return gulp.src('./src/frontend/templates/*.hbs')
               .pipe(hbsPrecompile())
            //    .pipe(rename({ extname: '.js' }))
               .pipe(concat('templates.js'))
               .pipe(gulp.dest(paths.templates_build));

    // return gulp.src(`${paths.templates_src}/**/*.hbs`)
    //            .pipe(gulp.dest(paths.templates_build));
})

gulp.task('libs', () => {
    return gulp.src(paths.libs_src + '/*.js')
               .pipe(gulp.dest(paths.libs_build));
});

gulp.task('js', () => {
    return gulp.src(`${paths.js_src}/app.js`)
               .pipe(eslint())
               .pipe(eslint.format())
               //.pipe(eslint.failAfterError())
            //    .pipe(babel({
            //        presets: ['@babel/env']
            //    }))
               .pipe(webpack({
                    //entry: './app.js',
                    output: {
                        filename: 'app.js',
                        path: path.resolve(__dirname, 'build')
                    },
                    mode: 'production',
                    optimization: {
                        minimize: false
                    }
               }))
               .pipe(gulp.dest(paths.js_build))
               .pipe(browserSync.stream());
})

gulp.task('res', () => {
    return gulp.src(`${paths.res_src}/**/*`)
               .pipe(gulp.dest(paths.build));
})

gulp.task('server', () => {
    return gulp.src(`${paths.back_src}/**`)
               //.pipe(eslint())
               //.pipe(eslint.format())
               //.pipe(eslint.failAfterError())
               //.pipe(babel({
               //     presets: ['@babel/env']
               //}))
               .pipe(gulp.dest(paths.back_build));
})


gulp.task('clean', () => {
    return del([`${paths.build}/**/*`, `!${paths.build}`])
});

gulp.task('all', gulp.series('clean', 'res', 'sass', 'html', 'js', 'libs', 'server'));

gulp.task('default', () => {
    gulp.task('all')();
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    
    gulp.watch(paths.sass_src, gulp.series('sass'));
    gulp.watch(paths.html_src, gulp.series('html'));
    gulp.watch(paths.templates_src, gulp.series('templates'));
    gulp.watch(paths.js_src, gulp.series('js'));
    gulp.watch(paths.back_src, gulp.series('server'));
});
