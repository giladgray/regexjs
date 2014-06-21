define ['backbone'], (Backbone) ->
  class TestView extends Backbone.View
    template: 'test'
    el: false
    keep: true

    events:
      'click .delete': 'destroy'

    initialize: ->
      @model.on 'all', @render, @

    serialize: ->
      status: @model.get('status')
      string: @model.get('string')
      stringFormat: @model.get('string').replace(s = @model.get('match')?[0], "<strong>#{s}</strong>")
      match: @model.get('match')

    destroy: ->
      @model.destroy()
      @remove()
