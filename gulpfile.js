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
const browserSync = require('browser-sync').create();

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

gulp.task('js', () => {
    return gulp.src(`${paths.js_src}/**`)
               .pipe(eslint())
               .pipe(eslint.format())
               //.pipe(eslint.failAfterError())
               .pipe(babel({
                   presets: ['@babel/env']
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

gulp.task('all', gulp.series('clean', 'res', 'sass', 'html', 'js', 'server'));

gulp.task('default', () => {
    gulp.task('all')();
    browserSync.init({
        server: {
            baseDir: paths.build
        }
    });
    
    gulp.watch(paths.sass_src, gulp.series('sass'));
    gulp.watch(paths.html_src, gulp.series('html'));
    //gulp.watch(paths.js_src, gulp.series('js'));
    gulp.watch(paths.back_src, gulp.series('server'));
});
