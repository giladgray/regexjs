"use strict";

# all the top-level dependencies go here. simply requiring 'app' will give you all these libraries.
_        = require 'underscore'
$        = require 'jquery'
Backbone = require 'backbone'

require 'backbone.layoutmanager'
require './lib/bootstrap'

# Localize or create a new JavaScript Template object.
JST = window.JST = window.JST or {}

# Provide a global location to place configuration settings and module creation.
app = root: "/"

# Mix Backbone.Events, modules, and layout management into the app object.
_.extend app, Backbone.Events,

module.exports =
  app: app

  # Create a custom object with a nested Views object.
  module: (additionalProps) ->
    _.extend Views: {}, additionalProps

  # Helper for using layouts.
  useLayout: (name) ->
    # If already using this Layout, then don't re-inject into the DOM.
    return @layout  if @layout and @layout.options.template is name
    # If a layout already exists, remove it from the DOM.
    @layout.remove()  if @layout
    # Create a new Layout.
    layout = new Backbone.Layout
      template: name
      className: "layout menu-container " + name
      id: "layout"
    # Insert into the DOM.
    $("#main").empty().append layout.el
    # Render the layout.
    layout.render()
    # Cache the refererence.
    @layout = layout
    # Return the reference, for chainability.
    layout

