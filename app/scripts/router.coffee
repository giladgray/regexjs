define ['app', 'views/navbar', 'views/editor'], (app, NavbarView, EditorView) ->
	"use strict"

	# Defining the application router, you can attach sub routers here.
	Router = Backbone.Router.extend
		routes:
			'': 'regex'
			
		initialize: ->
			app.useLayout 'layout'
			app.layout.setView('#navbar',
				@navbar = new NavbarView()).render()

		regex: ->
			app.layout.setView('#editor', new EditorView()).render()
