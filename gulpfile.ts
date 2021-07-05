/**
 *
 * run: yarn (or npx) gulp --require ts-node/register commonjs esm
 *
 */

import gulp from 'gulp';
import merge from 'merge2';
import uglify from 'gulp-uglify';
import terser from 'gulp-terser';
import tsGulp from 'gulp-typescript';

const commonjs = () => {
  const proj = tsGulp.createProject('tsconfig.json');

  return proj
    .src()
    .pipe(proj())
    .js.pipe(uglify({ compress: { sequences: false } }))
    .pipe(gulp.dest('dist'));
};

const esm = () => {
  const proj = tsGulp.createProject('tsconfig.esm.json');
  const tsResult = proj.src().pipe(proj());

  return merge([
    tsResult.dts.pipe(gulp.dest('dist/esm')),
    tsResult.js
      .pipe(terser({ compress: { sequences: false } }))
      .pipe(gulp.dest('dist/esm')),
  ]);
};

gulp.task('commonjs', commonjs);
gulp.task('esm', esm);
