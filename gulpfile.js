const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
let cleanCSS = require("gulp-clean-css");
const htmlmin = require("gulp-htmlmin");
const del = require("del");

gulp.task("clean", done => {
  del.sync("build/**/*");
  done();
});

gulp.task("minify-scripts", done => {
  gulp
    .src(["*.js", "!gulpfile.js"])
    .pipe(
      babel({
        presets: ["@babel/preset-env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("build"));
  done();
});

gulp.task("minify-css", done => {
  gulp
    .src("*.css")
    .pipe(cleanCSS())
    .pipe(gulp.dest("build"));
  done();
});

gulp.task("minify-html", done => {
  gulp
    .src("*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
  done();
});

gulp.task("copy", done => {
  gulp
    .src(["manifest.json", "images/**/*", "Roboto/**/*", "utils/**/*"], {
      base: "."
    })
    .pipe(gulp.dest("build"));
  done();
});

gulp.task(
  "default",
  gulp.series(
    "clean",
    "minify-scripts",
    "minify-css",
    "minify-html",
    "copy",
    done => done()
  )
);
