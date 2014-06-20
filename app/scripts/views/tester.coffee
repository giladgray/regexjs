define ['backbone', 'models/expression'], (Backbone, Expression) ->
	class TesterView extends Backbone.View
		template: 'test-list'

		events:
			'submit form': 'addTest'

		initialize: ->
			# create a list of expressions to store tests
			@tests = new Expression.List()
			# subscribe to regex:test event (triggered by editor)
			Backbone.on 'regex:test', @performTests, @

		serialize: ->
			tests: @tests.models
			# calculate some stats about the tests
			stats:
				total: @tests.models.length
				status: @tests.countBy (item) -> item.get 'status'

		addTest: (e) ->
			e.preventDefault()
			# add a new test to the collection
			if testString = @$('#test-string').val()
				@tests.add
					string: testString
			# instruct editor to send us the regex so we can test
			Backbone.trigger 'regex:get'

		performTests: (regex) ->
			console.log "running #{@tests.size()} tests..."
			# compare each test string to the regex and record the result
			@tests.each (item) ->
				if result = regex.exec item.get('string')
					item.set('status', 'success')
				else
					item.set('status', 'error')
				item.set('match', result)
				# console.log regex, item.get('string'), result
			# re-render this view to update the statuses
			@render()
