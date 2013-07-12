define ['backbone', 'models/expression'], (Backbone, Expression) ->
	class TesterView extends Backbone.View
		template: 'test-list'

		events:
			'submit form': 'addTest'

		initialize: ->
			# create a list of expressions to store tests, re-render on change
			@tests = new Expression.List()
			@tests.on 'all', @render, @
			# subscribe to regex:test event (triggered by editor)
			Backbone.on 'regex:test', @performTests, @

		serialize: -> 
			tests: @tests.models

		addTest: (e) ->
			e.preventDefault()
			# add a new test to the collection
			@tests.add
				string: @$('#test-string').val()

		performTests: (regex) ->
			console.log "running #{@tests.size()} tests..."
			# compare each test string to the regex and record the result
			@tests.each (item) ->
				if result = regex.test item.get('string')
					item.set('status', 'success')
				else
					item.set('status', 'error')
				console.log regex, item.get('string'), result
			# re-render this view to update the statuses
			@render()
