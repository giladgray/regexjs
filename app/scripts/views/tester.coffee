define ['backbone', 'models/expression', 'views/test'], (Backbone, Expression, TestView) ->
  class TesterView extends Backbone.View
    template: 'test-list'

    events:
      'submit form': 'addTest'

    initialize: ->
      # create a list of expressions to store tests
      @testList = new Expression.List()
      @listenTo @testList, 'add', @addItem
      # subscribe to regex:test event (triggered by editor)
      Backbone.on 'regex:test', @performTests, @

    addItem: (model) ->
      @insertView '#test-list', new TestView {model}
      @render()

    serialize: ->
      tests: @testList.models
      # calculate some stats about the tests
      stats:
        total: @testList.models.length
        status: @testList.countBy (item) -> item.get 'status'

    addTest: (e) ->
      e.preventDefault()
      # add a new test to the collection
      if string = @$('#test-string').val()
        @testList.add {string}
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
