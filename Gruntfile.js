(function () {
  var httpPlease, middlewares, proxy, sass, serveStatic, tildeImporter, url;

  proxy = require('proxy-middleware');

  serveStatic = require('serve-static');

  httpPlease = require('connect-http-please');

  url = require('url');

  middlewares = require('./speed-middleware');

  sass = require('node-sass');

  tildeImporter = require('node-sass-tilde-importer');

  module.exports = function (grunt) {
    var accountName,
      compress,
      config,
      environment,
      imgProxyOptions,
      localHost,
      name,
      pkg,
      port,
      portalHost,
      portalProxyOptions,
      rewriteLocation,
      rewriteReferer,
      secureUrl,
      taskArray,
      taskName,
      tasks,
      verbose,
      _results;
    pkg = grunt.file.readJSON('package.json');
    accountName = process.env.VTEX_ACCOUNT || pkg.accountName || 'basedevmkp';
    environment = process.env.VTEX_ENV || pkg.env || 'vtexcommercestable';
    secureUrl = process.env.VTEX_SECURE_URL || pkg.secureUrl || true;
    port = process.env.PORT || pkg.port || 80;
    console.log('Running on port ' + port);
    compress = grunt.option('compress');
    verbose = grunt.option('verbose');
    if (secureUrl) {
      imgProxyOptions = url.parse("https://" + accountName + ".vteximg.com.br/arquivos");
    } else {
      imgProxyOptions = url.parse("http://" + accountName + ".vteximg.com.br/arquivos");
    }
    imgProxyOptions.route = '/arquivos';
    portalHost = accountName + "." + environment + ".com.br";
    localHost = accountName + ".vtexlocal.com.br";
    if (port !== 80) {
      localHost += ":" + port;
    }
    if (secureUrl) {
      portalProxyOptions = url.parse("https://" + portalHost + "/");
    } else {
      portalProxyOptions = url.parse("http://" + portalHost + "/");
    }
    portalProxyOptions.preserveHost = true;
    portalProxyOptions.cookieRewrite = accountName + ".vtexlocal.com.br";
    rewriteReferer = function (referer) {
      if (referer == null) {
        referer = '';
      }
      if (secureUrl) {
        referer = referer.replace('http:', 'https:');
      }
      return referer.replace(localHost, portalHost);
    };
    rewriteLocation = function (location) {
      return location.replace('https:', 'http:').replace(portalHost, localHost);
    };
    config = {
      clean: {
        main: ['build']
      },
      copy: {
        html: {
          files: [{
            expand: true,
            cwd: 'src/',
            src: ['**/*.html'],
            dest: 'build/'
          }]
        },
        js: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'build/arquivos/'
          }]
        },
        css: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.css'],
            dest: 'build/arquivos/'
          }]
        }
      },
      coffee: {
        main: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.coffee'],
            dest: 'build/arquivos/',
            ext: '.js'
          }]
        }
      },
      sass: {
        compile: {
          options: {
            implementation: sass,
            sourceMap: false,
            importer: tildeImporter
          },
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.scss'],
            dest: 'build/arquivos/',
            ext: '.css'
          }]
        },
        min: {
          options: {
            implementation: sass,
            sourceMap: true,
            importer: tildeImporter,
            outputStyle: 'compressed',
            sourceMapRoot: '../src/'
          },
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.scss'],
            dest: 'build/arquivos/',
            ext: '.min.css'
          }]
        }
      },
      less: {
        main: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.less'],
            dest: "build/arquivos/",
            ext: '.css'
          }]
        }
      },
      cssmin: {
        main: {
          expand: true,
          flatten: true,
          cwd: 'src/',
          src: ['**/*.css', '!**/*.min.css'],
          dest: 'build/arquivos/',
          ext: '.min.css'
        }
      },
      uglify: {
        options: {
          sourceMap: {
            root: '../../src/'
          },
          mangle: {
            reserved: ['jQuery']
          },
          compress: {
            drop_console: true
          }
        },
        main: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'build/',
            src: ['**/*.js', '!**/*.min.js'],
            dest: 'build/arquivos/',
            ext: '.min.js'
          }]
        }
      },
      sprite: {
        all: {
          src: 'src/sprite/*.png',
          dest: 'build/arquivos/spritesheet.png',
          destCss: 'build/arquivos/sprite.css'
        }
      },
      imagemin: {
        main: {
          files: [{
            expand: true,
            flatten: true,
            cwd: 'src/',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'build/arquivos/'
          }]
        }
      },
      connect: {
        http: {
          options: {
            hostname: "*",
            livereload: true,
            port: port,
            middleware: [
              middlewares.disableCompression,
              middlewares.rewriteLocationHeader(rewriteLocation),
              middlewares.replaceHost(portalHost),
              middlewares.replaceReferer(rewriteReferer),
              middlewares.replaceHtmlBody(environment, accountName, secureUrl, port),
              httpPlease({
                host: portalHost,
                verbose: verbose
              }),
              serveStatic('./build'),
              proxy(imgProxyOptions),
              proxy(portalProxyOptions),
              middlewares.errorHandler
            ]
          }
        }
      },
      watch: {
        options: {
          livereload: true
        },
        coffee: {
          files: ['src/**/*.coffee'],
          tasks: ['coffee']
        },
        images: {
          options: {
            livereload: false
          },
          files: ['src/**/*.{png,jpg,gif}'],
          tasks: ['imagemin']
        },
        sprite: {
          options: {
            livereload: false
          },
          files: ['src/sprite/**/*.png'],
          tasks: ['sprite']
        },
        css: {
          files: ['src/**/*.css'],
          tasks: ['copy:css']
        },
        sass: {
          files: ['src/**/*.scss'],
          tasks: ['sass:compile']
        },
        less: {
          files: ['src/**/*.less'],
          tasks: ['less']
        },
        html: {
          files: ['src/**/*.html'],
          tasks: ['copy:html']
        },
        js: {
          files: ['src/**/*.js'],
          tasks: ['copy:js']
        },
        grunt: {
          files: ['Gruntfile.coffee']
        }
      }
    };
    tasks = {
      build: ['clean', 'copy:js', 'copy:css', 'copy:html', 'sprite', 'coffee', 'less', 'sass:compile', 'imagemin'],
      min: ['uglify', 'cssmin', 'sass:min'],
      dist: ['build', 'min'],
      test: [],
      "default": ['build', 'connect', 'watch']
    };
    if (compress) {
      tasks.build.push('min');
      config.watch.js.tasks.push('uglify');
      config.watch.sass.tasks.push('sass:min');
    }
    grunt.config.init(config);
    for (name in pkg.devDependencies) {
      if (name.slice(0, 6) === 'grunt-') {
        grunt.loadNpmTasks(name);
      }
    }
    _results = [];
    for (taskName in tasks) {
      taskArray = tasks[taskName];
      _results.push(grunt.registerTask(taskName, taskArray));
    }
    return _results;
  };

}).call(this);