define ["app", "router", 'templates'], (app, Router, Templates) ->
  "use strict"

  # removes the given class from all elements (optionally within scope selector)
  # and applies it to this element. useful for singleton class, such as .active
  $.fn.takeClass = (targetClass, scope='') ->
    $(scope + " ." + targetClass).removeClass targetClass
    @addClass targetClass

  # Configure LayoutManager with Backbone Boilerplate defaults.
  Backbone.Layout.configure
    manage: true

    fetch: (path) ->
      # Handlebars pre-compiled templates make this about as easy as possible.
      # either the template exists and is ready to rock, or it doesn't and never will.
      console.error "unknown template '#{path}'" unless Templates[path]
      Templates[path]

  Handlebars.registerHelper 'first', (context, options) ->
    if context.length then options.fn(context[0])

  Handlebars.registerHelper 'rest', (context, options) ->
    return _.map(_.rest(context), options.fn).join('\n')

  Handlebars.registerHelper 'ifLoggedIn', (context, options) ->
    if Parse.User.current() then options.fn(context) else options.inverse(context)

  # quickly add purecss classes to elements. pure-[base]-[classes...]
  Handlebars.registerHelper 'pure', (base, classes..., options) ->
    new Handlebars.SafeString "pure-#{base} " + _.map(classes, (cls) -> "pure-#{base}-#{cls}").join(' ')

  # allows for dynamically choosing which partial to render.
  # {{partial [template] [context]}}
  Handlebars.registerHelper 'partial', (template, context, opts) ->
    partial = Handlebars.partials[template];
    throw "partial template '#{template}' not found" unless partial
    # execute selected partial against context and make it safe
    new Handlebars.SafeString(partial(context))

  # Define your master router on the application namespace and trigger all
  # navigation from this instance.
  app.router = new Router()

  # Trigger the initial route and enable HTML5 History API support, set the
  # root folder to '/' by default.  Change in app.js.
  Backbone.history.start
    # pushState: true
    root: app.root

  # All navigation that is relative should be passed through the navigate
  # method, to be processed by the router. If the link has a `data-bypass`
  # attribute, bypass the delegation completely.
  $(document).on "click", "a:not([data-bypass])", (evt) ->
    # Get the absolute anchor href.
    href = $(this).attr("href")
    # If the href exists and is a hash route, run it through Backbone.
    if href and href.indexOf("#") is 0
      # Stop the default event to ensure the link will not cause a page refresh.
      evt.preventDefault()
      # `Backbone.history.navigate` is sufficient for all Routers and will
      # trigger the correct events. The Router's internal `navigate` method
      # calls this anyways.  The fragment is sliced from the root.
      Backbone.history.navigate href, true
