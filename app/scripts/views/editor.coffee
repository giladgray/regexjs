define ['backbone'], (Backbone) ->
	class EditorView extends Backbone.View
		template: 'editor'

		events:
			'blur textarea': 'printRegex'
			'blur input': 'printRegex'

		getRegex: -> new RegExp(@$('#regex').val(), @$('#otpions').val())

		printRegex: -> 
			@$('.alert').text('')
			try
				console.log regex = @getRegex()
				Backbone.trigger 'regex:test', regex
			catch err
				@$('.alert').show().text(err.message)
