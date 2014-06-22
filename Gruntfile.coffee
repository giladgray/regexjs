Gruntfile = require 'backstrap-gruntfile'

###
Installation commands:
npm install --save-dev grunt browserify coffeeify load-grunt-tasks time-grunt
npm install --save-dev grunt-browserify grunt-contrib-clean grunt-contrib-concat grunt-contrib-connect grunt-contrib-copy grunt-contrib-cssmin grunt-contrib-handlebars grunt-contrib-imagemin grunt-contrib-sass grunt-contrib-uglify grunt-contrib-watch grunt-gh-pages grunt-template grunt-usemin
###

module.exports = (grunt) ->
  options = {}

  Gruntfile grunt,
    styles : ['styles/main.scss']


