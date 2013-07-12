define ['app'], (app) ->
	"use strict"

	# Defining the application router, you can attach sub routers here.
	Router = Backbone.Router.extend
		routes:
			'': 'index'
			
		initialize: ->

		index: ->
