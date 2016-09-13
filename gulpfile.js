const gulp = require('gulp');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const webpack = require('webpack-stream');

gulp.task('sass', () => {
	gulp.src('assets/*.scss')
    	.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest('dist'));
});



gulp.task('babel', () => {
	gulp.src('assets/sandbox.jsx')
        .pipe(webpack({
            output: {
                filename: 'bundle.js'
            },
            module: {
                loaders: [
                    {
                        test: /\.jsx$/,
                        exclude: /(node_modules|bower_components)/,
                        loader: 'babel-loader',
                        query: {
                            presets: ['react','es2015']
                        }
                    }
                ]
            },
        }))
        .pipe(gulp.dest('dist'));
});

// .pipe(babel({
//     presets: ['es2015', 'react']
// })).on("error", (e) => {
//     console.error(e)
//     this.emit('end')
// }).

gulp.task('build', ['babel', 'sass']);
