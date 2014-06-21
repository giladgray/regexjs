"use strict"

###
Installation commands:
npm install --save-dev grunt browserify coffeeify load-grunt-tasks time-grunt
npm install --save-dev grunt-browserify grunt-contrib-clean grunt-contrib-concat grunt-contrib-connect grunt-contrib-copy grunt-contrib-cssmin grunt-contrib-handlebars grunt-contrib-imagemin grunt-contrib-sass grunt-contrib-uglify grunt-contrib-watch grunt-gh-pages grunt-template grunt-usemin
###

# # Globbing
# for performance reasons we're only matching one level down:
# 'test/spec/{,*/}*.js'
# use this if you want to recursively match all subfolders:
# 'test/spec/**/*.js'
module.exports = (grunt) ->
  pkg = grunt.file.readJSON('package.json')

  # load all grunt tasks and time execution
  require('load-grunt-tasks') grunt
  require('time-grunt') grunt

  ###### PLUGIN CONFIGURATIONS ######
  grunt.initConfig
    # grunt-contrib-watch
    watch:
      template:
        files: ['app/_*']
        tasks: ['template']
      browserify:
        files: 'app/scripts/{,*/}*.coffee'
        tasks: ['coffee']
      handlebars:
        files: ['app/templates/{,*/}*.hbs']
        tasks: ['handlebars']
      sass:
        files: ['app/styles/{,*/}*.{scss,sass}']
        tasks: ['sass'] #, 'autoprefixer']
      livereload:
        options:
          livereload: '<%= connect.options.livereload %>'
        files: ['dist/**/*.{js,css,html,json,png}']

    clean:
      dist: ['dist']

    coffee:
      dist:
        files: [
          expand: true
          cwd: 'app/scripts'
          src: '**/*.coffee'
          dest: '.tmp/scripts'
          ext: '.js'
        ]

    # grunt-browserify
    browserify:
      options:
        transform: ['coffeeify']
      main:
        files:
          'dist/scripts/index.js': ['app/scripts/index.coffee']

    # grunt-contrib-sass
    sass:
      dist:
        options:
          style: 'compact'
        files: [
          expand: true
          cwd: 'app/styles'
          src: '*.{scss,sass}'
          dest: 'dist/styles'
          ext: '.css'
        ]

    # grunt-contrib-handlebars
    handlebars:
      dist:
        files:
          '.tmp/scripts/templates.js': ['app/templates/{,*/}*.hbs']
        options:
          amd: true
          namespace: 'Templates'
          processName: (filename) ->
            filename.match(/templates\/(.+)\.h[bj]s$/)[1]

    # grunt-template
    template:
      dist:
        options:
          data: pkg
        files:
          'dist/index.html'   : ['app/_index.html']
          'dist/manifest.json': ['app/_manifest.json']

    # grunt-contrib-copy
    copy:
      dist:
        files: [
          {expand: true, cwd: 'app', src: ['styles/fonts/**'], dest: 'dist'},
        ]

    # grunt-contrib-imagemin
    imagemin:
      dist:
        expand: true
        cwd: 'app'
        src: ['images/*.png']
        dest: 'dist'

    # grunt-usemin
    useminPrepare:
      html: 'app/_index.html'

    # grunt-usemin
    usemin:
      options:
        dirs: ['dist']
      html: ['dist/{,*/}*.html']

    # grunt-contrib-connect
    connect:
      options:
        port: 9000
        livereload: 35729
        # Change this to '0.0.0.0' to access the server from outside
        hostname: 'localhost'
      livereload:
        options:
          open: true
          base: ['app', '.tmp', 'dist']
      test:
        options:
          port: 9001
          base: ['app', '.tmp', 'dist', 'test']
      dist:
        options:
          open: true
          base: 'dist'
          livereload: false
      github:
        options:
          open: 'https://giladgray.github.io/mmindd-mmvp'

    # grunt-gh-pages
    'gh-pages':
      options:
        base: 'dist'
      src: ['**']

  ######### TASK DEFINITIONS #########

  # compile assets for development
  grunt.registerTask 'build', [
    'clean'
    'sass'
    'handlebars'
    'coffee'
    'copy'
    'template'
  ]

  # build, dev server, watch
  grunt.registerTask 'dev', [
    'build'
    'connect:livereload'
    'watch'
  ]

  # compress and obfuscate files for production
  grunt.registerTask 'minify', [
    'imagemin'
    'useminPrepare'
    'concat'
    'uglify'
    'cssmin'
    'usemin'
  ]

  # build, minify, copy production assets
  grunt.registerTask 'dist', [
    'build',
    'minify',
    'copy',
    'connect:dist:keepalive'
  ]

  # publish dist/ directory to github and open page
  grunt.registerTask 'deploy', [
    'gh-pages'
    'connect:github'
  ]

  grunt.registerTask 'default', ['dev']
