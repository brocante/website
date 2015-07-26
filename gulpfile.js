var keys = require('./keys');
var gulp = require('gulp');
var gutil = require('gulp-util');
var ftp = require('vinyl-ftp');

gulp.task('deploy', function() {

    var conn = ftp.create({
        host    : keys.host,
        user    : keys.user,
        password: keys.password,
        parallel: 10,
        log     : gutil.log
    });

    var globs = [
        'www/**'
    ];

    // using base = '.' will transfer everything to /public_html correctly
    // turn off buffering in gulp.src for best performance

    return gulp.src(globs, {base: 'www', buffer: false})
        .pipe(conn.newer('/public_html')) // only upload newer files
        .pipe(conn.dest('/public_html'));

});