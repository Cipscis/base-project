'use strict';

import gulp from 'gulp';

//////////////////////
// Webpack bundling //
//////////////////////
import webpack from 'webpack-stream';
import webpackConfig from './webpack.config.js';

const jsEntryPoints = 'assets/js/src/main.js';
const jsSrcDir = 'assets/js/src';
const jsOutputDir = 'assets/js/dist';

const buildJs = function () {
	return gulp.src(jsEntryPoints)
		.pipe(webpack(webpackConfig))
		.pipe(gulp.dest(jsOutputDir));
};

const watchJs = function () {
	gulp.watch([
		'*.js',
		`${jsSrcDir}/**/*.js`,
	], buildJs);
};

//////////////////////
// SCSS Compilation //
//////////////////////
import sass from 'gulp-sass';

import dartSass from 'sass';
sass.compiler = dartSass;

const cssSrcDir = 'assets/scss';
const cssOutputDir = 'assets/css';

const buildSass = function () {
	return gulp.src(`${cssSrcDir}/**/*.scss`)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(cssOutputDir));
};

const watchSass = function () {
	gulp.watch(`${cssSrcDir}/**/*.scss`, buildSass);
};

//////////////////
// Export tasks //
//////////////////
const build = gulp.parallel(buildSass, buildJs);
const watch = gulp.parallel(watchSass, watchJs);

export { build, watch };
export default gulp.series(build, watch);
