const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsp = ts.createProject('tsconfig.json');
const webpack = require("webpack");
const webpackConfig = require("./webpack.config.js");
const cp = require('child_process');

const PATHS = {
    scripts: ['./lib/**/*.ts', './examples/**/*.pug'],
    output: './dist',
};

gulp.task('webpack', ['build-ts'], (cb) => {
    "use strict";
    webpack(webpackConfig({})).run((err, stats) => {
        if (err) {
            console.log("webpack failed")
        }
        cb();
    })
})

gulp.task('build-ts', function () {
    return gulp.src(PATHS.scripts[0])
        .pipe(tsp())
        .pipe(gulp.dest(PATHS.output));
});

gulp.task('watch-ts', ['build-ts'], function () {
    gulp.watch(PATHS.scripts, ['webpack']);
});

gulp.task('server', function () {
    cp.exec('node ./express-server.js', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('dev', ['server', 'webpack', 'watch-ts']);