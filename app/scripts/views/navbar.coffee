define ['backbone', 'views/help'], (Backbone, HelpView) ->
	class NavbarView extends Backbone.View
		template: 'navbar'

		events:
			'click #learn': 'showHelp'

		showHelp: (e) ->
			e.preventDefault()
			@helpView = @helpView or new HelpView()
			@helpView.modal()
