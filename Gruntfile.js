/*global module:false*/
module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    typescript: {
      base: {
        src: ['src/**/*.ts'],
        options: {
          module: 'amd',
          target: 'es5',
          sourceMap: true,
          decaration: true
        }
      }
    },
    jst : {
      compile: {
        options: {
          amd: true
        },
        files: {
          'gen/jst.js' : [
            'templates/**/*.html'
          ]
        }
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: true
      },
      ts: {
        files: 'src/**/*.ts',
        tasks: ['typescript']
      },
      jst: {
        files: ['templates/**/*.html'],
        tasks: ['jst']
      }
    },
    connect: {
      server: {
        options: {
          port: 3001,
          base : '.',
          hostname: 'localhost',
          livereload: true,
          // for proxy
          middleware: function(connect, options) {
            var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
            if (Array.isArray(options.base)) {
              options.base = options.base[0];
            }
            return [
              proxy,
              connect.static(options.base),
              connect.directory(options.base)
            ];
          }
        }
      },
      proxies : [
        {
          context: '/api',
          host: 'localhost',
          port: 3000,
          changeOrigin: false,
          xforward: true
        }
      ]
    }
  });

  // Default task.
  grunt.registerTask('default', ['jst', 'typescript', 'configureProxies', 'connect:server', 'watch']);

};
