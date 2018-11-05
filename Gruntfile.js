'use strict';

var tilde_importer = require('grunt-sass-tilde-importer');

module.exports = function (grunt) {

  grunt.initConfig({

    cr_brand_year: "2018",

    sass: {
      options: {
        outputStyle: 'compressed',
        sourceMap: false,
        includePaths: ['node_modules'],
        importer: tilde_importer
      },
      all: {
        files: [{
          expand: true,
          cwd: 'sass',
          src: ['{,**/}*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      },
      base: {
        files: [{
          expand: true,
          cwd: 'sass/themes/base',
          src: ['{,**/}*.scss, !{,**/}__*.scss'],
          dest: 'dist/css/themes/base',
          ext: '.css'
        }]
      },
      cr17: {
        files: [{
          expand: true,
          cwd: 'sass/themes/cr/2017',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/cr/2017',
          ext: '.css'
        }]
      },
      crbrand: {
        files: [{
          expand: true,
          cwd: 'sass/themes/cr_brand/<%= cr_brand_year %>',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/cr_brand',
          ext: '.css'
        }]
      },
      frost: {
        files: [{
          expand: true,
          cwd: 'sass/themes/frost',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/frost',
          ext: '.css'
        }]
      },
      payin: {
        files: [{
          expand: true,
          cwd: 'sass/themes/payin',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/payin',
          ext: '.css'
        }]
      },
      donate: {
        files: [{
          expand: true,
          cwd: 'sass/themes/donate',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/donate',
          ext: '.css'
        }]
      },
      rnd17: {
        files: [{
          expand: true,
          cwd: 'sass/themes/rnd/2017',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/rnd/2017',
          ext: '.css'
        }]
      },
      sr18: {
        files: [{
          expand: true,
          cwd: 'sass/themes/sr/2018',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/sr/2018',
          ext: '.css'
        }]
      },
      shop18: {
        files: [{
          expand: true,
          cwd: 'sass/themes/shop/2018',
          src: ['{,**/}*.scss'],
          dest: 'dist/css/themes/shop/2018',
          ext: '.css'
        }]
      },
      kssbase: {
        files: [{
          expand: true,
          cwd: 'sass/kss/kss-assets',
          src: ['{,**/}*.scss'],
          dest: 'kss/builder/kss-assets',
          ext: '.css'
        }]
      }
    },

    modernizr: {
      dist: {
        "crawl": false,
        "customTests": [],
        "dest": "dist/js/modernizr-output.js",
        "tests": [
          "svg",
          "touchevents",
          "flexbox",
          "cssmask",
          "mediaqueries",
          "objectfit",
          "details"
        ],
        "options": [
          "setClasses"
        ],
        "uglify": true
      }
    },

    imagemin: {
      base: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/base/components',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      },
      rnd17: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/themes/rnd/2017/components',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      },
      cr17: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/themes/cr/2017/components',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      },
      sr18: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/themes/sr/2018/components',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      },
      payin: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/themes/payin/',
          src: ['default/**/*.{png,jpg,gif}', 'sportrelief/**/*.{png,jpg,gif}' ],
          dest: 'dist/images'
        }]
      },
      donate: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/themes/donate',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images'
        }]
      },
    },

    svgmin: {
      options: {
        plugins: [
          {removeViewBox: false},
          {removeUselessStrokeAndFill: false},
          {removeEmptyAttrs: false},
          {removeHiddenElems: false},
          {cleanupIDs: false}
        ]
      },
      base: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/base/components',
          src: ['{,**/}*.svg'],
          dest: 'dist/images'
        }]
      },
      sr18: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/themes/sr/2018/components',
          src: ['{,**/}*.svg'],
          dest: 'dist/images'
        }]
      },
      payin: {
        files: [{
          expand: true,
          flatten: true,
          cwd: 'sass/',
          src: ['base/components/navigation/{,**/}*.svg', 'themes/payin/{,**/}*.svg'],
          dest: 'dist/images'
        }]
      }
    },

    uglify: {
      plugins_js: {
        files: [{
          src:
            [
              'node_modules/lightcase/src/js/lightcase.js'
            ],
          dest: 'dist/js/plugins.min.js'
        }]
      },
      base_components_js: {
        files: [{
          src: ['sass/base/components/{,**/}*.js'],
          dest: 'dist/js/base-components.min.js'
        }]
      },
      cr_components_js: {
        files: [{
          src: ['sass/themes/cr/2017/components/{,**/}*.js'],
          dest: 'dist/js/cr-components.min.js'
        }]
      }
    },

    sass_globbing: {
      base: {
        your_target: {
          files: {
            'sass/base/_components.scss': ['sass/base/components/**/*.scss', '!sass/base/components/**/__*.scss'],
            'sass/base/_variables.scss': 'sass/base/variables/*.scss',
            'sass/base/_core.scss': 'sass/base/core/*.scss'
          },
          options: {
            useSingleQuotes: false,
            signature: '/* generated with grunt-sass-globbing */\n\n'
          }
        }
      },
    },

    watch: {
      options: {
        livereload: true
      },
      sass: {
        files: ['sass/{,**/}*.{scss,sass}'],
        tasks: ['sass', 'postcss:all'],
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
        css: 'css/base/core.css',
        builder: 'node_modules/kss/builder/twig'
      },
      base: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'PatternLab',
          css: ['css/themes/base/base.css', '../css/kss/base.css']
        },
        src: ['sass/base', 'sass/themes/base'],
        dest: 'dist'
      },
      cr17: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Comic Relief PatternLab',
          css: ['../css/themes/cr/2017/cr17.css', '../css/kss/cr.css'],
        },
        src: ['sass/themes/cr/2017', 'sass/base'],
        dest: 'dist/cr'
      },
      crbrand: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'CR Brand PatternLab',
          // CSS filepaths to use within the generated template/s
          css: ['../css/themes/cr_brand/<%= cr_brand_year %>/crbrand<%= cr_brand_year %>.css', '../css/kss/crbrand<%= cr_brand_year %>.css'],
        },
        src: ['sass/themes/cr_brand/<%= cr_brand_year %>', 'sass/base'],
        
        // Markup location
        dest: 'dist/cr_brand'
      },
      rnd17: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Red Nose Day PatternLab',
          css: ['../css/themes/rnd/2017/rnd17.css', '../css/kss/rnd.css'],
        },
        src: ['sass/base', 'sass/themes/rnd/2017'],
        dest: 'dist/rnd'
      },
      sr18: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Sport Relief PatternLab',
          css: ['../css/themes/sr/2018/sr18.css', '../css/kss/sr.css']
        },
        src: ['sass/themes/sr/2018', 'sass/base'],
        dest: 'dist/sr'
      },
      payin: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Payin Online PatternLab',
          css: ['../css/themes/payin/payin.css', '../css/kss/payin.css']
        },
        src: ['sass/base/core',
              'sass/base/variables',
              'sass/base/components/selectbox',
              'sass/base/components/form',
              'sass/base/components/navigation/_footer-nav',
              'sass/base/components/footer',
              'sass/base/components/header/base-header',
              'sass/base/components/promo-header',
              'sass/base/components/card-block',
              'sass/base/components/cards',
              'sass/base/components/social',
              'sass/themes/sr/2018',
              'sass/themes/payin/default/components',
              'sass/themes/payin/sportrelief'
             ],
        dest: 'dist/payin'
      },
      donate: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Donate PatternLab',
          css: ['../css/themes/donate/donate.css', '../css/kss/donate.css'],
        },
        src: ['sass/themes/donate'],
        dest: 'dist/donate'
      },
      frost: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Frost PatternLab',
          css: ['../css/themes/frost/frost.css', '../css/kss/frost.css']
        },
        src: ['sass/base/core',
              'sass/base/variables',
              'sass/base/components/buttons',
              'sass/base/components/background-colours',
              'sass/base/components/footer',
              'sass/base/components/form',
              'sass/base/components/fundraising-target',
              'sass/base/components/links',
              'sass/base/components/list',
              'sass/base/components/progress-indicator',
              'sass/base/components/navigation/_footer-nav',
              'sass/base/components/social',
              'sass/base/components/just-in-time-block',
              'sass/themes/frost'
             ],
        dest: 'dist/frost'
      },
      shop18: {
        options: {
          verbose: true,
          builder: 'kss/builder',
          title: 'Shop 2018 PatternLab',
          css: ['../css/themes/shop/2018/shop18.css', '../css/kss/shop.css'],
        },
        src: ['sass/themes/shop/2018', 'sass/base'],
        dest: 'dist/shop'
      },
    },

    connect: {
      server: {
        options: {
          port: 1337,
          base: 'dist',
          open: true,
          keepalive: true,
        }
      },
      liveReload: {
        options: {
          port: 1337,
          base: 'dist',
          open: true,
          livereload: true,
        }
      }
    },

    clean: {
      build: ['tests/visual/reference']
    },

    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')
        ]
      },
      all: {
        src: ['dist/css/kss/*.css', 'dist/css/themes/**/*.css']
      },
      base: {
        src: ['dist/css/themes/base/*.css']
      },
      cr17: {
        src: ['dist/css/themes/cr/**/*.css']
      },
      crbrand: {
        src: ['dist/css/themes/cr_brand/**/*.css']
      },
      donate: {
        src: ['dist/css/themes/donate/**/*.css']
      },
      frost: {
        src: ['dist/css/kss/frost.css', 'dist/css/themes/frost/**/*.css']
      },
      payin: {
        src: ['dist/css/kss/payin.css', 'dist/css/themes/payin/**/*.css']
      },
      rnd17: {
        src: ['dist/css/kss/rnd.css', 'dist/css/themes/rnd/**/*.css']
      },
      sr18: {
        src: ['dist/css/kss/sr.css', 'dist/css/themes/sr/**/*.css']
      },
      shop18: {
        src: ['dist/css/kss/shop.css', 'dist/css/themes/shop/**/*.css']
      },
      kssbase: {
        src: ['kss/builder/kss-assets/**/*.css']
      }
    }
  });

  grunt.file.expand('node_modules/grunt-*/tasks').forEach(grunt.loadTasks);

  grunt.registerTask('watchAndServe', [
    'connect:liveReload',
    'watch',
  ]);

  grunt.registerTask('build', [
    'sass_globbing:base',
    'sass:all',
    'modernizr',
    'imagemin',
    'svgmin',
    'uglify',
    'kss',
    'postcss:all',
  ]);

  grunt.registerTask('build:base', [
    'sass_globbing:base',
    'sass:base',
    'modernizr',
    'imagemin:base',
    'svgmin:base',
    'uglify:plugins_js',
    'uglify:base_components_js',
    'kss:base',
    'postcss:base',
  ]);

  grunt.registerTask('build:cr17', [
    'sass:cr17',
    'modernizr',
    'uglify:cr_components_js',
    'kss:cr17',
    'postcss:cr17',
  ]);

  grunt.registerTask('build:donate', [
    'sass:donate',
    'modernizr',
    'imagemin:donate',
    'kss:donate',
    'postcss:donate',
  ]);

  grunt.registerTask('build:frost', [
    'sass:frost',
    'modernizr',
    'kss:frost',
    'postcss:frost',
  ]);

  grunt.registerTask('build:payin', [
    'sass:payin',
    'modernizr',
    'imagemin:payin',
    'svgmin:payin',
    'kss:payin',
    'postcss:payin',
  ]);

  grunt.registerTask('build:rnd17', [
    'sass:rnd17',
    'modernizr',
    'imagemin:rnd17',
    'kss:rnd17',
    'postcss:rnd17',
  ]);

  grunt.registerTask('build:sr18', [
    'sass:sr18',
    'modernizr',
    'imagemin:sr18',
    'svgmin:sr18',
    'kss:sr18',
    'postcss:sr18',
  ]);

  grunt.registerTask('build:shop18', [
    'sass:shop18',
    'modernizr',
    'kss:shop18',
    'postcss:shop18',
  ]);

  grunt.registerTask('build:crbrand', [
    'sass:crbrand',
    'modernizr',
    'kss:crbrand',
    'postcss:crbrand',
  ]);

  grunt.registerTask('clean:test', [
    'clean'
  ]);
};
