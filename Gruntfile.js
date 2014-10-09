module.exports = function(grunt) {
  grunt.initConfig({
    connect: {
      server: {
        options: {
          livereload: true,
          base: '.',
          port: 8000
        }
      }
    },
    watch: {
      options: {
        livereload: true
      },
      files: ['*.html', '*.js', '*.css']
    }
  });
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);
}
