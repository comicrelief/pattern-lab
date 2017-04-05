'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    sass: {
      dist: {
        options: {
            outputStyle: 'compressed',
            sourceMap: true
        },
        files: [{
            expand: true,
            cwd: 'sass',
            src: ['*/*.scss'],
            dest: 'css',
            ext: '.css'
        }]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['sass'],
        options: {
          // Start a live reload server on the default port 35729
          livereload: true
        }
      },
      images: {
        files: ['images/**']
      },
      css: {
        files: ['css/{,**/}*.css']
      }
    },

    kss: {
      options: {
        verbose: true,
        title: 'Comic Relief PatternLab',
        css: '../css/base/styles.css',
      },
      dist: {
        src: ['sass/base/core'],
        dest: 'styleguide'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-kss');

  grunt.registerTask('build', [
    'sass',
    'kss'
  ]);

  grunt.registerTask('watch:dev', [
    'watch'
  ]);
  
};