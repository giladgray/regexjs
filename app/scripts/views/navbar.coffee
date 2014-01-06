define ['backbone', 'views/help'], (Backbone, HelpView) ->
	class NavbarView extends Backbone.View
		template: 'navbar'
		className: 'container'

		events:
			'click #learn': 'showHelp'
			'click #feedback': 'feedback'

		showHelp: (e) ->
			e.preventDefault()
			@helpView = @helpView or new HelpView()
			@helpView.modal()

		feedback: (e) ->
			e.preventDefault()
			UserVoice = window.UserVoice or []
			UserVoice.push(['showLightbox', 'classic_widget'
				mode: 'feedback'
				primary_color: '#cc6d00'
				link_color: '#007dbf'
				forum_id: 214780
			  ])
