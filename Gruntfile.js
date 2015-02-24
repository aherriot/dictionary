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
      files: ['*.html', '*.js', '*.css'],
      css: {
        files: '**/*.scss',
        tasks: ['sass']
      }
    },
    sass: {
      dist: {
        files: {
          'style.css': 'style.scss'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');

  grunt.registerTask('serve', [
    'connect:server',
    'watch'
  ]);
}
