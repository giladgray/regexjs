class TestView extends Backbone.Layout
	template: '_test'

	events:
		'click .text': 'edit'
		'keypress .edit': 'keypress'
		'blur .edit': 'edit'

	initialize: ->

	edit: -> @$el.toggleClass('editing')

	keypress: (e) ->
		console.log e.keyCode, e
		if e.keyCode is 13
			@model.set('string', @$('.edit').val())

module.exports = TestView
