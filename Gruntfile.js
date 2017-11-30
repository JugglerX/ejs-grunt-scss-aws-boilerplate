module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  var jsLibs = [
    "public/assets/js/jquery-1.12.4.min.js",
    "public/assets/js/jquery.mmenu.all.js",
    "public/assets/js/megamenu.js",
    "public/assets/js/owl.carousel.min.js",
    "public/assets/js/tooltipster.bundle.min.js",
    "public/assets/js/scrollmagic.min.js",
    "public/assets/js/jquery.stickytableheaders.min.js",
    "public/assets/js/bootstrap.min.js",
    "public/assets/js/slick.min.js"
  ];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    aws: grunt.file.readJSON('aws-keys.json'),

    // adds a .html extension to all <a> tags
    dom_munger: {
      htmllinks: {
        options: {
          suffix: {selector:'a',attribute:'href',value:'.html'},
        },
        src: 'www/**/*.html' //could be an array of files
      }
    },

    sass: {
      options: {
        outputStyle: 'expanded',
        sourceComments: false,
        sourceMap: true // cant get them to work
      },
      style: {
        files: {
          'public/assets/css/style.css': 'public/assets/scss/style.scss'
        }
      }
    }, 

    uglify: {
      devScripts: {
        options: {
          sourceMap: true,
          compress: true,
          beautify: false,
          preserveComments: false,
          mangle: false
        },
        files: {
          'public/assets/js/scripts.min.js': 'public/assets/js/scripts.js'
        }
      },
      devLibs: {
        options: {
          sourceMap: true,
          compress: true,
          beautify: false,
          preserveComments: false,
          mangle: false
        },
        files: {
          'public/assets/js/libs.min.js': [jsLibs]
        }
      },
      prod: {
        options: {
          sourceMap: false,
          compress: true,
          beautify: false,
          preserveComments: false,
          mangle: false
        },
        files: {
          'www/assets/js/scripts.min.js': 'public/assets/js/scripts.js',
          'www/assets/js/libs.min.js': [jsLibs]
        }
      }
    },

    watch: {
      jsScripts: {
        files: [
          'public/assets/js/scripts.js'
        ],
        tasks: ['uglify:devScripts']
      },
      jsLibs: {
        files: [
          'Gruntfile.js',
          jsLibs
        ],
        tasks: ['uglify:devLibs']
      },
      scss: {
        files: 'public/assets/**/*.scss',
        tasks: ['sass:style']
      },
      ejs: {
        files: 'public/**/*.ejs',
        tasks: ['ejs:all']
      }
    },

    ejs: {
      all: {
        options: {
          title: 'My Website',
          url: function(url) {
            return '/public/' + url;
          }
        },
        src: [
          'public/**/*.ejs',
          '!public/templates/layout/**/*',
          '!public/templates/panels/**/*'
        ],
        dest: './',
        expand: true,
        ext: '.html'
      }
    },

    browserSync: {
      bsFiles: {
        src : [
          'public/assets/js/scripts.min.js',
          'public/assets/js/libs.min.js',
          'public/assets/css/*.css',
          'public/*.html'
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./public"
        }
      }
    },

    copy: {
      assets: {
        files: [
          { expand: true, cwd: 'public/assets/fonts', src: ['**/*'], dest: 'www/assets/fonts/'},
          { expand: true, cwd: 'public/assets/images', src: ['**/*'], dest: 'www/assets/images/'},
          { expand: true, cwd: 'public/assets/css', src: ['*.css'], dest: 'www/assets/css/'},
          { expand: true, cwd: 'public/', src: ['*.html'], dest: 'www/'}

        ]
      },
      cleanurls: {
        files: [
          {
            expand: true,
            dot: true,
            cwd: 'www',
            dest: 'www/',
            src: [
              '**/*.html'
            ],
            rename: function(dest, src) {
              return dest + src.replace('.html','');
            }
          }
        ]
      }
    },

    aws_s3: {
      options: {
          accessKeyId: '<%= aws.AWSAccessKeyId %>',
          secretAccessKey: '<%= aws.AWSSecretKey %>',
          region: '<%= aws.AWSRegion %>',
          uploadConcurrency: 5, // 5 simultaneous uploads
          downloadConcurrency: 5 // 5 simultaneous downloads
      },
      production: {
          options: {
              bucket: '<%= aws.AWSBucket %>'
          },
          files: [
              {dest: '/', cwd: 'www', action: 'delete',  differential: true},
              {action: "upload", expand: true, cwd: 'www', src: ['**'], dest: '/', differential: true}
          ]
      }
    },

    decomment: {
      withCwd: {
        options: {
          type: 'text'
        },
        expand: true,
        cwd: 'www/assets/css',
        src: ['*.css', '!*.min.css'],
        dest: 'www/assets/css',
        ext: '.css'
      }
    },

    cssmin: {
      options: {
        keepSpecialComments: 0
      },
      target: {
        files: [{
          expand: true,
          cwd: 'www/assets/css',
          src: ['*.css', '!*.min.css'],
          dest: 'www/assets/css',
          ext: '.min.css'
        }]
      }
    },

    clean: {
      www: ['www']
    },

    cleanempty: {
      options: {
        folders: true,
        noJunk: true
      },
      src: ['www/assets/css/*']
    },

    autoprefixer: {
      options: {
      },
      single_file: {
        src: 'www/assets/css/style.css'
      }
      // multiple_files: {
      //   expand: true,
      //   flatten: true,
      //   src: 'test/fixtures/*.css',
      //   dest: 'tmp/multiple_files/'
      // }
    }

});

  grunt.loadNpmTasks('grunt-dom-munger');
  grunt.loadNpmTasks('grunt-aws-s3');

  grunt.registerTask('server', ['browserSync','watch']);
  grunt.registerTask('build', ['ejs:all', 'sass', 'clean', 'uglify:prod','copy:assets','decomment','autoprefixer','cssmin']);
  grunt.registerTask('deploy', ['aws_s3']);

};
