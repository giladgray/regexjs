Backbone   = require 'backbone'
Expression = require '../models/expression'
TestView   = require './test'

class TesterView extends Backbone.View
	template: 'test-list'
	className: 'container'

	events:
		# 'click .text': 'edit'
		'submit form': 'addTest'

	initialize: ->
		# create a list of expressions to store tests
		@testList = new Expression.List()
		# subscribe to regex:test event (triggered by editor)
		Backbone.on 'regex:test', @performTests, @
		@testList.on 'all', @render, @

	serialize: ->
		tests: @testList.models
		# calculate some stats about the tests
		stats:
			total: @testList.models.length
			status: @testList.countBy (item) -> item.get 'status'

	beforeRender: ->
		# list = @$('ul')
		@testList.each (item) =>
			@insertView '#test-list', new TestView(model: item)

	addTest: (e) ->
		e.preventDefault()
		# add a new test to the collection
		if testString = @$('#test-string').val()
			@testList.add
				string: testString
		# instruct editor to send us the regex so we can test
		Backbone.trigger 'regex:get'

	performTests: (regex) ->
		console.log "running #{@testList.size()} tests..."
		# compare each test string to the regex and record the result
		@testList.each (item) ->
			if result = regex.exec item.get('string')
				item.set
					status: 'success'
					match: result
			else
				item.set
					status: 'error'
					match: null
			# console.log regex, item.get('string'), result
		# re-render this view to update the statuses
		# @render()

module.exports = TesterView
