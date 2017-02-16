'use strict'

const gulp = require('gulp');
const beautify = require('gulp-beautify');
const concat  =  require('gulp-concat');
const del = require('del');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const htmlmin = require('gulp-htmlmin');
const image = require('gulp-image');
const runSequence = require('run-sequence');
const watch = require('gulp-watch');

gulp.task('clean',()=>{
	return del(['dist']);
});

 
gulp.task('makeImage',()=> {
	gulp.src('static/img/*')
	.pipe(image())
	.pipe(gulp.dest('./static/img-min'));
});

gulp.task('makeCss',()=>{
	gulp.src('static/css/*.css')
	.pipe(cleanCSS({compatibility: 'ie8'}))
	.pipe(concat('style-min.css'))
	.pipe(gulp.dest('./static/css'))
});

// gulp.task('copy-index-html',() =>{
//     gulp.src('dev/index.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('./dist'));
// });

// gulp.task('copy-all-views',() =>{
//     gulp.src('dev/views/*.html')
//     .pipe(htmlmin({collapseWhitespace: true}))
//     .pipe(gulp.dest('./dist/views'));
// });

gulp.task('makeJsFiles',() =>{
	gulp.src('dev/js/**/*.js')
	.pipe(beautify())
	.pipe(concat('script-min.js'))
	.pipe(gulp.dest('./static/js'))
});

gulp.task('default',(cb)=>{
	return runSequence('clean',['makeImage','makeCss','makeJsFiles'],cb);
});

gulp.task('watch',()=>{
	gulp.watch('dev/**/*',()=>{ 
		runSequence('clean',['makeImage','makeCss','makeJsFiles']) 
	});
});