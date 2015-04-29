module.exports = function(grunt) {
  grunt.initConfig({
    stylus: {
      compile: {
        files: {
          'static/css/style.css': 'src/styl/main.styl'
        },
        options: {
          compress: false
        }
      }
    },
    imagemin: {
      dynamic: {
        options: {
          optimixationLevel: 3
        },
        files: [{
          expand: true,
          cwd: 'src/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/img'
        }]
      }
    },
    coffee: {
      glob_to_multiple: {
        expand: true,
        flatten: true,
        cwd: 'src/coffee/',
        src: ['*.coffee'],
        dest: 'dist/js/',
        ext: '.js'
      }
    },
    uglify: {
      options: {
        mangle: {
          except: ['jQuery']
        }
      },
      my_target: {
        files: [{
          expand: true,
          cwd: 'dist/js',
          src: '**/*.js',
          dest: 'dist/js'
        }]
      }
    },
    watch: {
      stylus: {
        files: ['src/styl/*.styl'],
        tasks: ['stylus'],
        options: {
          spawn: false,
        },
      },
      coffee: {
        files: ['src/coffee/*.coffee'],
        tasks: ['coffee'],
        options: {
          spawn: false,
        },
      },
    }
  });

  //load tasks
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //register tasks
  grunt.registerTask('prod', ['imagemin', 'uglify']);
  grunt.registerTask('dev', ['stylus', 'coffee']);
  grunt.registerTask('default', ['watch']);

}