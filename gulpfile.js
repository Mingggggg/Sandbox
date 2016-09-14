const gulp = require('gulp');
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

gulp.task('build', ['babel', 'sass']);
