define ['app', 'views/navbar', 'views/editor', 'views/tester', 'views/help'], (app, NavbarView, EditorView, TesterView, HelpView) ->
	"use strict"

	# Defining the application router, you can attach sub routers here.
	Router = Backbone.Router.extend
		routes:
			'': 'regex'
			'help': 'cheatSheet'

		regex: ->
			app.useLayout 'layout'
			app.layout.setView('#navbar', new NavbarView()).render()
			app.layout.setView('#editor', new EditorView()).render()
			app.layout.setView('#tests',  new TesterView()).render()

		# full-screen cheat sheet!
		cheatSheet: ->
			app.useLayout 'cheat'
			app.layout.setView('#sheet', @help = new HelpView()).render()
			@help.$el.addClass('in')

