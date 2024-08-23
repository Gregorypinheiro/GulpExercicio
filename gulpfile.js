const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const unglify = require('gulp-uglify');
const obfuscate = require('gulp-obfuscate');
const imagemin = require('gulp-imagemin');

function compilaSass() {
    return gulp.src('./source/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }))
        .pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./build/styles'));
}

function comprimeJavaScript() {
    return gulp.src('./source/scripts/*.js')
    .pipe(unglify())
    .pipe(obfuscate())
    .pipe(gulp.dest('./build/scripts'))
}

function comprimeImagens() {
    return gulp.src('./source/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images'))
}

exports.sass = compilaSass;
exports.javascript = comprimeJavaScript;
exports.images = comprimeImagens;
exports.default = function() {
    gulp.watch('./source/styles/main.scss', { ignoreInitial: false}, gulp.series(compilaSass));
    gulp.watch('./source/scripts/*.js', { ignoreInitial: false}, gulp.series(comprimeJavaScript));
    gulp.watch('./source/images/*', { ignoreInitial: false}, gulp.series(comprimeImagens));
}
