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
            dest: 'dist/css',
            ext: '.css'
        }]
      }
    },

    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      }
    },

    sass_globbing: {
      your_target: {
        files: {
          'sass/base/_components.scss': 'sass/base/components/**/*.scss'
        },
        options: {
          useSingleQuotes: false,
          signature: '/* generated with grunt-sass-globbing */\n\n'
        }
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
        files: ['dist/images/**']
      },
      css: {
        files: ['dist/css/{,**/}*.css']
      }
    },

    kss: {
      options: {
        verbose: true,
        css: '/css/base/core.css',
        builder: 'node_modules/kss/builder/twig'
      },
      all: {
        options: {
          verbose: true,
          builder: 'kss',
          title: 'PatternLab',
          css: '/css/themes/all/all.css'
        },
        src: ['sass/base', 'sass/components', 'sass/themes/all'],
        dest: 'dist'
      },
      cr17: {
        options: {
          verbose: true,
          builder: 'kss',
          title: 'Comic Relief PatternLab',
          css: '/css/themes/cr/2017/cr17.css'
        },
        src: ['sass/base', 'sass/themes/cr/2017'],
        dest: 'dist/cr'
      },
      rnd17: {
        options: {
          verbose: true,
          title: 'Red Nose Day PatternLab',
          css: '/css/themes/rnd/2017/rnd17.css',
        },
        src: ['sass/base/core', 'sass/themes/rnd/2017'],
        dest: 'dist/rnd'
      },
      sr18: {
        options: {
          verbose: true,
          title: 'Sport Relief PatternLab',
          css: '/css/themes/sr/2018/sr18.css',
        },
        src: ['sass/base/core', 'sass/themes/sr/2018'],
        dest: 'dist/sr'
      },
      payin: {
        options: {
          verbose: true,
          title: 'Payin Online PatternLab',
          css: '/css/themes/payin/payin.css',
        },
        src: ['sass/base/core', 'sass/themes/payin'],
        dest: 'dist/payin'
      },
      frost: {
        options: {
          verbose: true,
          title: 'Frost PatternLab',
          css: '/css/themes/frost/frost.css',
        },
        src: ['sass/base/core', 'sass/themes/frost'],
        dest: 'dist/frost'
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-sass-globbing');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-kss');
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  grunt.registerTask('build', [
    'sass_globbing',
    'sass',
    'imagemin',
    'kss'
  ]);

  grunt.registerTask('watch:dev', [
    'watch'
  ]);
  
};