(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var app;

app = {
  root: "/"
};

_.extend(app, Backbone.Events, {
  module: function(additionalProps) {
    return _.extend({
      Views: {}
    }, additionalProps);
  },
  useLayout: function(name) {
    var layout;
    if (this.layout && this.layout.options.template === name) {
      return this.layout;
    }
    if (this.layout) {
      this.layout.remove();
    }
    layout = new Backbone.Layout({
      template: name,
      className: "layout menu-container " + name,
      id: "layout"
    });
    $("#main").empty().append(layout.el);
    layout.render();
    this.layout = layout;
    return layout;
  }
});

module.exports = app;


},{}],2:[function(require,module,exports){
var Router, app,
  __slice = [].slice;

app = require('./app.coffee');

Router = require('./router.coffee');

"use strict";

$.fn.takeClass = function(targetClass, scope) {
  if (scope == null) {
    scope = '';
  }
  $(scope + " ." + targetClass).removeClass(targetClass);
  return this.addClass(targetClass);
};

Backbone.Layout.configure({
  manage: true,
  fetchTemplate: function(path) {
    if (!Templates[path]) {
      console.error("unknown template '" + path + "'");
    }
    return Templates[path];
  }
});

Handlebars.registerHelper('first', function(context, options) {
  if (context.length) {
    return options.fn(context[0]);
  }
});

Handlebars.registerHelper('ifLoggedIn', function(context, options) {
  if (Parse.User.current()) {
    return options.fn(context);
  } else {
    return options.inverse(context);
  }
});

Handlebars.registerHelper('pure', function() {
  var base, classes, options, _i;
  base = arguments[0], classes = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), options = arguments[_i++];
  return new Handlebars.SafeString(("pure-" + base + " ") + _.map(classes, function(cls) {
    return "pure-" + base + "-" + cls;
  }).join(' '));
});

Handlebars.registerHelper('partial', function(template, context, opts) {
  var partial;
  partial = Handlebars.partials[template];
  if (!partial) {
    throw "partial template '" + template + "' not found";
  }
  return new Handlebars.SafeString(partial(context));
});

app.router = new Router({
  app: app
});

Backbone.history.start({
  root: app.root
});

$(document).on("click", "a:not([data-bypass])", function(evt) {
  var href;
  href = $(this).attr("href");
  if (href && href.indexOf("#") === 0) {
    evt.preventDefault();
    return Backbone.history.navigate(href, true);
  }
});


},{"./app.coffee":1,"./router.coffee":5}],3:[function(require,module,exports){
module.exports={
	"regex": [
		{
			"rule": "/xxxx/",
			"description": "a regular expression"
		}
	],
	"characters": [
		{
			"rule": "A-Z a-z 0-9",
			"description": "alphanumeric"
		},
		{
			"rule": "\\u0000-\\uFFFF",
			"description": "unicode hex"
		},
		{
			"rule": "\\x00-\\xFF",
			"description": "ASCII hex"
		},
		{
			"rule": "\\nn",
			"description": "punctuation"
		},
		{
			"rule": "\\t",
			"description": "tab character"
		},
		{
			"rule": "\\n",
			"description": "new line"
		}
	],
	"classes": [
		{
			"rule": ".",
			"description": "straight up anything"
		},
		{
			"rule": "[xx]",
			"description": "one of...",
			"example": "[@#!$&]"
		},
		{
			"rule": "[^xx]",
			"description": "one not of...",
			"example": "[^aeiou]"
		},
		{
			"rule": "xx|xx",
			"description": "either-or",
			"example": "jpg|gif"
		},
		{
			"rule": "nn-nn",
			"description": "range",
			"example": "\\x11-\\xDD"
		},
		{
			"rule": "\\d",
			"description": "digit",
			"example": "[0-9]"
		},
		{
			"rule": "\\D",
			"description": "non-digit",
			"example": "[^0-9]"
		},
		{
			"rule": "\\w",
			"description": "word char",
			"example": "[A-Za-z]"
		},
		{
			"rule": "\\W",
			"description": "non-word char",
			"example": "[^A-Za-z]"
		},
		{
			"rule": "\\s",
			"description": "whitespace"
		},
		{
			"rule": "\\S",
			"description": "non-whitespace"
		}
	],
	"repeaters": [
		{
			"rule": "xx?",
			"description": "optional (0 or 1)"
		},
		{
			"rule": "xx*",
			"description": "any (0 or more)"
		},
		{
			"rule": "xx+",
			"description": "etc. (1 or more)"
		},
		{
			"rule": "xx{nn}",
			"description": "exactly",
			"example": "\\d{3}"
		},
		{
			"rule": "xx{nn,}",
			"description": "minimum",
			"example": "\\w{2,}"
		},
		{
			"rule": "xx{nn,nn}",
			"description": "range",
			"example": "[a-z]{3,9}"
		}
	],
	"captures": [
		{
			"rule": "(xx)",
			"description": "groups or captures characters"
		},
		{
			"rule": "(?:xx)",
			"description": "non-capturing group"
		}
	]
}

},{}],4:[function(require,module,exports){
var Expression,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Expression = (function(_super) {
  __extends(Expression, _super);

  function Expression() {
    return Expression.__super__.constructor.apply(this, arguments);
  }

  Expression.prototype.defaults = {
    string: ''
  };

  return Expression;

})(Backbone.Model);

Expression.List = (function(_super) {
  __extends(List, _super);

  function List() {
    return List.__super__.constructor.apply(this, arguments);
  }

  List.prototype.model = Expression;

  return List;

})(Backbone.Collection);

module.exports = Expression;


},{}],5:[function(require,module,exports){
"use strict";
var EditorView, HelpView, NavbarView, Router, TesterView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

NavbarView = require('./views/navbar.coffee');

EditorView = require('./views/editor.coffee');

TesterView = require('./views/tester.coffee');

HelpView = require('./views/help.coffee');

Router = (function(_super) {
  __extends(Router, _super);

  function Router() {
    return Router.__super__.constructor.apply(this, arguments);
  }

  Router.prototype.routes = {
    '': 'regex',
    'help': 'cheatSheet'
  };

  Router.prototype.initialize = function(_arg) {
    this.app = _arg.app;
    if (this.app == null) {
      throw new Error('must provide app to Router');
    }
  };

  Router.prototype.regex = function() {
    this.app.useLayout('layout');
    this.app.layout.setViews({
      '#navbar': new NavbarView(),
      '#editor': new EditorView(),
      '#tests': new TesterView()
    });
    return this.app.layout.render();
  };

  Router.prototype.cheatSheet = function() {
    this.app.useLayout('cheat');
    this.app.layout.setView('#sheet', this.help = new HelpView()).render();
    return this.help.$el.addClass('in');
  };

  return Router;

})(Backbone.Router);

module.exports = Router;


},{"./views/editor.coffee":6,"./views/help.coffee":7,"./views/navbar.coffee":8,"./views/tester.coffee":10}],6:[function(require,module,exports){
var EditorView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

EditorView = (function(_super) {
  __extends(EditorView, _super);

  function EditorView() {
    return EditorView.__super__.constructor.apply(this, arguments);
  }

  EditorView.prototype.template = 'editor';

  EditorView.prototype.className = 'container';

  EditorView.prototype.events = {
    'blur textarea': 'printRegex',
    'blur input': 'printRegex',
    'change input': 'printRegex'
  };

  EditorView.prototype.initialize = function() {
    return Backbone.on('regex:get', this.printRegex, this);
  };

  EditorView.prototype.getOption = function(id) {
    if (this.$('#' + id).is(':checked')) {
      return id;
    } else {
      return '';
    }
  };

  EditorView.prototype.getRegex = function() {
    return new RegExp(this.$('#regex').val(), this.getOption('g') + this.getOption('m') + this.getOption('i'));
  };

  EditorView.prototype.printRegex = function() {
    var err, regex;
    this.$('.alert').text('');
    try {
      console.log(regex = this.getRegex());
      return Backbone.trigger('regex:test', regex);
    } catch (_error) {
      err = _error;
      return this.$('.alert').show().text(err.message);
    }
  };

  return EditorView;

})(Backbone.Layout);

module.exports = EditorView;


},{}],7:[function(require,module,exports){
var HelpView, regexes,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

regexes = require('../lib/regex.json');

HelpView = (function(_super) {
  __extends(HelpView, _super);

  function HelpView() {
    return HelpView.__super__.constructor.apply(this, arguments);
  }

  HelpView.prototype.template = 'help';

  HelpView.prototype.className = 'modal modal-help fade';

  HelpView.prototype.defaultOptions = {
    remove: false,
    keyboard: true,
    backdrop: true
  };

  HelpView.prototype.events = {
    'click #popout': 'popout'
  };

  HelpView.prototype.initialize = function() {
    var rules, type, _results;
    this.regexes = {};
    _results = [];
    for (type in regexes) {
      rules = regexes[type];
      _results.push(this.regexes[type] = _.map(rules, function(rule) {
        return {
          description: rule.description.replace(/\n/g, '<br/>'),
          example: rule.example || '',
          rule: rule.rule.replace(/xxxx/g, '<em class="x2"></em>').replace(/xx/g, '<em></em>').replace(/nn/g, '<i></i>')
        };
      }));
    }
    return _results;
  };

  HelpView.prototype.serialize = function() {
    return this.regexes;
  };

  HelpView.prototype.popout = function() {
    var _ref;
    return (_ref = this._modal) != null ? _ref.modal('hide') : void 0;
  };

  HelpView.prototype.modal = function(options) {
    if (options == null) {
      options = {};
    }
    _.defaults(options, this.defaults);
    if (!this._modal) {
      this.render();
    }
    this._modal = this.$el.modal(options);
    return $('.modal-backdrop').click((function(_this) {
      return function() {
        return _this._modal.modal('hide');
      };
    })(this));
  };

  return HelpView;

})(Backbone.Layout);

module.exports = HelpView;


},{"../lib/regex.json":3}],8:[function(require,module,exports){
var HelpView, NavbarView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

HelpView = require('../views/help.coffee');

NavbarView = (function(_super) {
  __extends(NavbarView, _super);

  function NavbarView() {
    return NavbarView.__super__.constructor.apply(this, arguments);
  }

  NavbarView.prototype.template = 'navbar';

  NavbarView.prototype.events = {
    'click #learn': 'showHelp',
    'click #feedback': 'feedback'
  };

  NavbarView.prototype.showHelp = function(e) {
    e.preventDefault();
    if (this.helpView == null) {
      this.helpView = new HelpView();
    }
    return this.helpView.modal();
  };

  NavbarView.prototype.feedback = function(e) {
    var UserVoice;
    e.preventDefault();
    UserVoice = window.UserVoice || [];
    return UserVoice.push([
      'showLightbox', 'classic_widget', {
        mode: 'feedback',
        primary_color: '#cc6d00',
        link_color: '#007dbf',
        forum_id: 214780
      }
    ]);
  };

  return NavbarView;

})(Backbone.Layout);

module.exports = NavbarView;


},{"../views/help.coffee":7}],9:[function(require,module,exports){
var TestView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

TestView = (function(_super) {
  __extends(TestView, _super);

  function TestView() {
    return TestView.__super__.constructor.apply(this, arguments);
  }

  TestView.prototype.template = 'test';

  TestView.prototype.el = false;

  TestView.prototype.keep = true;

  TestView.prototype.events = {
    'click .delete': 'destroy'
  };

  TestView.prototype.initialize = function() {
    return this.model.on('all', this.render, this);
  };

  TestView.prototype.serialize = function() {
    var s, _ref, _ref1;
    return {
      status: this.model.get('status'),
      string: this.model.get('string'),
      stringFormat: this.model.get('string').replace(s = (_ref = this.model.get('match')) != null ? _ref[0] : void 0, "<strong>" + s + "</strong>"),
      match: (_ref1 = this.model.get('match')) != null ? _ref1.slice(1) : void 0
    };
  };

  TestView.prototype.destroy = function() {
    this.model.destroy();
    return this.remove();
  };

  return TestView;

})(Backbone.Layout);

module.exports = TestView;


},{}],10:[function(require,module,exports){
var Expression, TestView, TesterView,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Expression = require('../models/expression.coffee');

TestView = require('../views/test.coffee');

TesterView = (function(_super) {
  __extends(TesterView, _super);

  function TesterView() {
    return TesterView.__super__.constructor.apply(this, arguments);
  }

  TesterView.prototype.template = 'test-list';

  TesterView.prototype.events = {
    'submit form': 'addTest'
  };

  TesterView.prototype.initialize = function() {
    this.testList = new Expression.List();
    this.listenTo(this.testList, 'add', this.addItem);
    return Backbone.on('regex:test', this.performTests, this);
  };

  TesterView.prototype.addItem = function(model) {
    this.insertView('#test-list', new TestView({
      model: model
    }));
    return this.render();
  };

  TesterView.prototype.serialize = function() {
    return {
      tests: this.testList.models,
      stats: {
        total: this.testList.models.length,
        status: this.testList.countBy(function(item) {
          return item.get('status');
        })
      }
    };
  };

  TesterView.prototype.addTest = function(e) {
    var string;
    e.preventDefault();
    if (string = this.$('#test-string').val()) {
      this.testList.add({
        string: string
      });
    }
    return Backbone.trigger('regex:get');
  };

  TesterView.prototype.performTests = function(regex) {
    console.log("running " + (this.testList.size()) + " tests...");
    return this.testList.each(function(item) {
      var result;
      if (result = regex.exec(item.get('string'))) {
        return item.set({
          status: 'success',
          match: result
        });
      } else {
        return item.set({
          status: 'error',
          match: null
        });
      }
    });
  };

  return TesterView;

})(Backbone.Layout);

module.exports = TesterView;


},{"../models/expression.coffee":4,"../views/test.coffee":9}]},{},[2])