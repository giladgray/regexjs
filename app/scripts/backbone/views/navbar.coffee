HelpView = require '../views/help.coffee'

class NavbarView extends Backbone.Layout
	template: 'navbar'

	events:
		'click #learn': 'showHelp'
		'click #feedback': 'feedback'

	showHelp: (e) ->
		e.preventDefault()
		@helpView ?= new HelpView()
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

module.exports = NavbarView
