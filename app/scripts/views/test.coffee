Backbone = require 'backbone'

class TestView extends Backbone.View
	template: 'test'
	el: false

	events:
		'click .text': 'edit'
		'keypress .edit': 'keypress'
		'blur .edit': 'edit'

	initialize: ->
		@model.on 'all', @render, @

	serialize: ->
		string: @model.get('string')
		stringFormat: @model.get('string').replace(s = @model.get('match')[0], "<strong>#{s}</strong>")
		match: @model.get('match')

	_updateTest: ->
		@model.set('string', @$('.edit').val())

	edit: ->
		@$el.toggleClass('editing')
		@$('.edit').focus()
		@_updateTest() unless @$el.hasClass 'editing'

	keypress: (e) ->
		if e.keyCode is 13
			@_updateTest()

module.exports = TestView
