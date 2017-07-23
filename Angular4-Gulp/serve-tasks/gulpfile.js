gulp.task('serve', ['watch:src'], function () {
  var server = liveServer.new('server.js');
  server.start();

  gulp.watch('server.js', server.start.bind(server));
});