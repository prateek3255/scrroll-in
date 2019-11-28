const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const del = require('del');

gulp.task('clean', done => {
    del.sync('build/**/*');
    done()
})

gulp.task('scripts', done => {
    gulp.src('*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('build'))
    done()
})

gulp.task('copy', done => {
    gulp.src(['manifest.json', '*.html', '*.css', 'images/**/*', 'Roboto/**/*'], { base: "." })
        .pipe(gulp.dest('build'));
    done()
})

gulp.task('default', gulp.series('clean', 'scripts', 'copy', done => done()))