regexes = require '../lib/regex.json'

class HelpView extends Backbone.Layout
  template: 'help'

  className: 'modal modal-help fade'

  defaultOptions:
    remove: false
    keyboard: true
    backdrop: true

  events:
    'click #popout': 'popout'

  initialize: ->
    @regexes = {}
    # fancy up the rules with some HTML substitution
    for type, rules of regexes
      @regexes[type] = _.map rules, (rule) ->
        description: rule.description.replace /\n/g, '<br/>'
        example: rule.example or ''
        rule: rule.rule.replace(/xxxx/g, '<em class="x2"></em>')
                  .replace(/xx/g, '<em></em>')
                  .replace(/nn/g, '<i></i>')

  serialize: -> @regexes

  popout: ->
    @_modal?.modal('hide')

  # Launches this ModalView as a Bootstrap modal dialog using the jQuery plugin.
  modal: (options={}) ->
    _.defaults options, @defaults
    # if we don't have a reference to it then the modal hasn't been rendered
    @render() unless @_modal

    @_modal = @$el.modal(options)
    $('.modal-backdrop').click => @_modal.modal('hide')

module.exports = HelpView
