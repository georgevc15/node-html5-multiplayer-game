"use strict"

let gulp = require('gulp');

gulp.task('default', [ 'test', 'serve' ]);

gulp.task('serve',()=> {
	require('./server.js');
});