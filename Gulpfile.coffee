gulp    = require 'gulp'
gutil   = require 'gulp-util'
coffee  = require 'gulp-coffee'
concat  = require 'gulp-concat'
uglify  = require 'gulp-uglify'
minify  = require 'gulp-minify-css'
sass    = require 'gulp-sass'
handlebars = require 'gulp-handlebars'
declare = require 'gulp-declare'
browserify = require 'gulp-browserify'

express = require 'express'
path    = require 'path'
tinylr  = require 'tiny-lr'

gulp.task 'scripts', ->
	gulp.src 'app/scripts/main.coffee', read:false
		.pipe browserify
			transform : ['coffeeify']
			extensions: ['.coffee']
			shim:
				handlebars:
					path: 'node_modules/handlebars/dist/handlebars.runtime.js'
					exports: 'Handlebars'
			# 	jquery:
			# 		exports: '$'
			# 	underscore:
			# 		exports: '_'
		.pipe concat('main.js')
		.pipe gulp.dest './dist/scripts/'

gulp.task 'styles', ->
	gulp.src 'app/styles/main.scss'
		.pipe sass()
		.pipe minify(keepBreaks: true)
		.pipe gulp.dest 'dist/styles/'

gulp.task 'templates', ->
	gulp.src 'app/templates/**.hbs'
		.pipe handlebars()
		.pipe declare namespace: 'Templates'
		.pipe concat('templates.js')
		.pipe gulp.dest 'dist/scripts/'

gulp.task 'copy', ->
	gulp.src ['app/*.*', 'app/images/*', 'app/styles/fonts/*']
		.pipe gulp.dest 'dist/'

# https://gist.github.com/Contra/8066801
createServers = (port, lrport) ->
  lr = tinylr()
  lr.listen lrport, -> gutil.log "LiveReload Listening on", lrport

  app = express()
  app.use express.static(path.resolve("./dist"))
  app.listen port, -> gutil.log "Listening on", port

  {lr: lr, app: app}
# gulp.task 'server', ->
servers = createServers(8080, 35729)

gulp.task 'default', ['styles', 'templates', 'scripts', 'copy'], ->
  gulp.watch ["./**/*", "!./node_modules/**/*"], (evt) ->
    gutil.log gutil.colors.cyan(evt.path), "changed"
    servers.lr.changed body:
      files: [evt.path]

