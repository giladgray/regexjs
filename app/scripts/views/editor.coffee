define ['backbone'], (Backbone) ->
	class EditorView extends Backbone.View
		template: 'editor'

		events:
			'blur textarea': 'printRegex'
			'blur input': 'printRegex'
			'change input': 'printRegex'

		initialize: ->
			Backbone.on 'regex:get', @printRegex, @

		getOption: (id) -> if @$('#' + id).is(':checked') then id else ''

		getRegex: -> new RegExp(@$('#regex').val(), @getOption('g') + @getOption('m') + @getOption('i'))

		printRegex: -> 
			@$('.alert').text('')
			try
				console.log regex = @getRegex()
				Backbone.trigger 'regex:test', regex
			catch err
				@$('.alert').show().text(err.message)
