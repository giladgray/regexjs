define ['backbone', 'text!lib/regex.json'], (Backbone, regexes) ->
	regexes = JSON.parse regexes
	class HelpView extends Backbone.View
		template: 'help'

		className: 'modal modal-help fade'

		defaults:
			remove: true

		events:
			'click #popout': 'popout'

		initialize: ->
			@regexes = {}
			# fancy up the rules with some HTML substitution
			for type, rules of regexes
				@regexes[type] = _.map rules, (rule) ->
					rule: rule.rule.replace(/xx/g, '<em></em>').replace(/nn/g, '<i></i>')
					description: rule.description.replace /\n/g, '<br/>'
					example: rule.example or ''

		serialize: -> @regexes

		popout: ->
			@_modal?.modal('hide')

		# Launches this ModalView as a Bootstrap modal dialog using the jQuery plugin.
		# Returns a promise that resolves when modal is closed.
		# The promise is never rejected but it's safer to use always() instead of done()
		modal: (options={}) ->
			_.defaults options, @defaults
			# if we don't have a reference to it then the modal hasn't been rendered
			@render() unless @_modal

			@_modal = @$el.modal(options)
			deferred = new $.Deferred()
			# resolve the promise on modal hide
			@_modal.on 'hidden', =>
				deferred.resolve()
				@remove() if options.remove
			return deferred
