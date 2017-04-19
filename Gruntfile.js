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
            src: ['{,**/}*.scss'],
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
        css: '../css/base/all.css',
        builder: 'node_modules/kss/builder/twig'
      },
      all: {
        options: {
          verbose: true,
          title: 'Comic Relief PatternLab',
          css: '../css/base/all.css'
        },
        src: ['sass/themes/all'],
        dest: 'styleguide'
      },
      cr17: {
        options: {
          verbose: true,
          title: 'Comic Relief PatternLab',
          css: '../css/themes/cr/2017/cr17.css'
        },
        src: ['sass/base', 'sass/themes/cr/2017'],
        dest: 'styleguide/cr'
      },
      rnd17: {
        options: {
          verbose: true,
          title: 'Red Nose Day PatternLab',
          css: '../css/themes/rnd17.css',
        },
        src: ['sass/base/core', 'sass/themes/rnd/2017'],
        dest: 'styleguide/rnd'
      },
      sr18: {
        options: {
          verbose: true,
          title: 'Sport Relief PatternLab',
          css: '../css/themes/sr/2018/sr18.css',
        },
        src: ['sass/base/core', 'sass/themes/sr/2018'],
        dest: 'styleguide/sr'
      },
      payin: {
        options: {
          verbose: true,
          title: 'Payin Online PatternLab',
          css: '../css/themes/payin/payin.css',
        },
        src: ['sass/base/core', 'sass/themes/payin'],
        dest: 'styleguide/payin'
      },
      frost: {
        options: {
          verbose: true,
          title: 'Frost PatternLab',
          css: '../css/themes/frost/frost.css',
        },
        src: ['sass/base/core', 'sass/themes/frost'],
        dest: 'styleguide/frost'
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