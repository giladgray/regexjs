"use strict"

NavbarView = require './views/navbar.coffee'
EditorView = require './views/editor.coffee'
TesterView = require './views/tester.coffee'
HelpView   = require './views/help.coffee'

# Defining the application router, you can attach sub routers here.
class Router extends Backbone.Router

  routes:
    '': 'regex'
    'help': 'cheatSheet'

  initialize: ({@app}) ->
    unless @app?
      throw new Error('must provide app to Router')

  regex: ->
    @app.useLayout 'layout'
    @app.layout.setViews
      '#navbar' : new NavbarView()
      '#editor' : new EditorView()
      '#tests'  : new TesterView()
    @app.layout.render()

  # full-screen cheat sheet!
  cheatSheet: ->
    @app.useLayout 'cheat'
    @app.layout.setView('#sheet', @help = new HelpView()).render()
    @help.$el.addClass('in')

module.exports = Router
