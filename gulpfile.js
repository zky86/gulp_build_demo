'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var rename = require("gulp-rename");
var minifyCss = require("gulp-minify-css");
var concat = require('gulp-concat');
var rev = require('gulp-rev'); //- 对文件名加MD5后缀
var revCollector = require('gulp-rev-collector'); //- 路径替换
var uglify = require('gulp-uglifyjs');
var minifyJS = require('gulp-minify');
// gulp.task('all', function () {
//   return gulp.src(['./src/**','!./src/css/**/*.scss'])
//     .pipe(gulp.dest('./app/'));
// });

gulp.task('sass', function()
{
    return gulp.src('./src/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(
        {
            extname: ".css"
        }))
        .pipe(gulp.dest('./pub/css/'));
});


// 压缩css
gulp.task('minify-css', function()
{
    gulp.src('./pub/css/*.css') // 要压缩的css文件
        .pipe(minifyCss()) //压缩css
        .pipe(gulp.dest('./css_yashuo/css/'));
});


// 合并css
gulp.task('css_concat', function()
{
    gulp.src('./pub/css/*.css') // 要压缩的css文件
        .pipe(concat('min.css'))
        .pipe(minifyCss())

    .pipe(gulp.dest('./css_hebing/css/'));
});


// css生成md5
gulp.task('css_md5', function()
{ //- 创建一个名为 concat 的 task
    gulp.src('./pub/css/*.css') //- 需要处理的css文件，放到一个字符串数组里
        .pipe(concat('style.min.css')) //- 合并后的文件名
        .pipe(minifyCss()) //- 压缩处理成一行
        .pipe(rev()) //- 文件名加MD5后缀
        .pipe(gulp.dest('./md5/css')) //- 输出文件本地
        .pipe(rev.manifest()) //- 生成一个rev-manifest.json
        .pipe(gulp.dest('./md5/css')); //- 将 rev-manifest.json 保存到 rev 目录内
});


// css md5替换html 
gulp.task('rev', ['cssConcat'], function()
{
    console.log(111)
    gulp.src(['./md5/css/rev-manifest.json', './html/test.html']) //- 读取 rev-manifest.json 文件以及需要进行css名替换的文件
        .pipe(revCollector()) //- 执行文件内css名的替换
        .pipe(gulp.dest('./html_pub/')); //- 替换后的文件输出的目录
});


// js合并
gulp.task('js_concat', function()
{
    gulp.src('./src/js/*.js')
        .pipe(concat('js.min.js')) //- 合并后的文件名
        .pipe(gulp.dest('./js_hebing/js/')); //- 输出文件本地
});



// js压缩
gulp.task('js_min', function()
{
    gulp.src('./src/js/*.js')
        .pipe(uglify(
        {
            mangle: true, //类型：Boolean 默认：true 是否修改变量名
            compress: true,//类型：Boolean 默认：true 是否完全压缩,
            outSourceMap: true
        }))
        .pipe(gulp.dest('./js_yashuo/js'));
});


gulp.task('watches', function()
{
    gulp.watch('./src/**', ['sass']);
});