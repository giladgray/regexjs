this["Templates"] = this["Templates"] || {};

Handlebars.registerPartial("actions", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<ul class=\"actions unstyled\">\n	<li>\n        <button class=\"pure-button edit\">Edit</button>\n    </li>\n	<li>\n        <button class=\"pure-button delete\">Delete</button>\n    </li>\n</ul>\n";
  }));

Handlebars.registerPartial("help-table", Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, functionType="function", self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

function program3(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += " \n	<tr>\n		<td class=\"item\">";
  if (helper = helpers.rule) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.rule); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.example), {hash:{},inverse:self.program(6, program6, data),fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " \n	</tr>\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<td class=\"desc\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		<td class=\"ex\">";
  if (helper = helpers.example) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.example); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  return buffer;
  }

function program6(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<td class=\"desc\" colspan=\"2\">";
  if (helper = helpers.description) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.description); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</td>\n		";
  return buffer;
  }

  buffer += "<table class=\"";
  stack1 = (helper = helpers.pure || (depth0 && depth0.pure),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, "table", "horizontal", "striped", options) : helperMissing.call(depth0, "pure", "table", "horizontal", "striped", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n	";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</table>";
  return buffer;
  }));

this["Templates"]["cheat"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div id=\"sheet\" class=\"\"></div>\n";
  });

this["Templates"]["editor"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"regex pure-form\">\n	<div class=\"expression pure-row\">\n		<input type=\"text\" name=\"regex\" id=\"regex\" rows=\"3\" autofocus placeholder=\"r[aeiou]g[aeiou]x{3}\"></textarea>\n	</div>\n	<ul class=\"modifiers pure-row inline\">\n		<li>\n			<input type=\"checkbox\" name=\"global\" id=\"g\">\n			<label for=\"g\" class=\"pure-checkbox\">\n				<strong>G</strong>lobal\n			</label>\n		</li>\n		<li>\n			<input type=\"checkbox\" name=\"multiline\" id=\"m\">\n			<label for=\"m\" class=\"pure-checkbox\">\n				<strong>M</strong>ultiline\n			</label>\n		</li>\n		<li>\n			<input type=\"checkbox\" name=\"ignore\" id=\"i\">\n			<label for=\"i\" class=\"pure-checkbox\">\n				<strong>I</strong>gnore case\n			</label>\n		</li>\n	</ul>\n</div>\n<div class=\"alert alert-error hide\" id=\"error\"></div>\n";
  });

this["Templates"]["help"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, self=this;


  buffer += "<div class=\"modal-header\">\n	<a href=\"#/help\" id=\"popout\" class=\"pull-right\" target=\"_blank\" data-bypass>Pop Out</a>\n	<h1>Regular Expressions Cheat Sheet</h1>\n</div>\n<div class=\"modal-body pure-g pure-u-1\">\n	<div class=\"pure-u-1-2\">\n		<label id=\"regex\">Regular Expressions</label>\n		";
  stack1 = self.invokePartial(partials['help-table'], 'help-table', (depth0 && depth0.regex), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		<label id=\"characters\">Characters</label>\n		";
  stack1 = self.invokePartial(partials['help-table'], 'help-table', (depth0 && depth0.characters), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		<label id=\"repeaters\">Repeaters</label>\n		";
  stack1 = self.invokePartial(partials['help-table'], 'help-table', (depth0 && depth0.repeaters), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	</div>\n	<div class=\"pure-u-1-2\">\n		<label id=\"classes\">Character Classes</label>\n		";
  stack1 = self.invokePartial(partials['help-table'], 'help-table', (depth0 && depth0.classes), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		<label id=\"captures\">Captures</label>\n		";
  stack1 = self.invokePartial(partials['help-table'], 'help-table', (depth0 && depth0.captures), helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n\n		<label>\n			Pretty simple, right?\n		</label>\n	</div>\n</div>\n<div class=\"modal-footer\">\n	More Information:\n	<ul class=\"inline\">\n		<li><a href=\"http://www.visibone.com/regular-expressions/\" target=\"_blank\">Visual Cheat Sheet</a></li>\n		<li><a href=\"https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp\" target=\"_blank\">RegExp Documentation (MDN)</a></li>\n	</ul>\n</div>\n";
  return buffer;
  });

this["Templates"]["layout"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  


  return "<div class=\"section-top\">\n  <div id=\"navbar\" class=\"pure-u-1 container\"></div>\n  <div id=\"editor\" class=\"pure-u-1 container\"></div>\n</div>\n<div class=\"section-bottom\">\n  <div id=\"switch\" class=\"pure-u-1 container\">\n    <button class=\"btn\">Build</button><button class=\"btn\">Test</button>\n  </div>\n  <div id=\"tests\" class=\"pure-u-1 container\"></div>\n  <div id=\"build\" class=\"pure-u-1 container\"></div>\n</div>\n";
  });

this["Templates"]["navbar"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "";
  return buffer;
  }

  buffer += "<div class=\"";
  stack1 = (helper = helpers.pure || (depth0 && depth0.pure),options={hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data},helper ? helper.call(depth0, "menu", "open", "horizontal", options) : helperMissing.call(depth0, "pure", "menu", "open", "horizontal", options));
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n    <ul>\n        <li><a href=\"\" id=\"learn\">Cheat Sheet</a></li>\n        <li><a href=\"\" id=\"feedback\">Feedback</a></li>\n        <li><a href=\"https://github.com/giladgray/regexjs\" target=\"_blank\">GitHub</a></li>\n    </ul>\n	<a href=\"#\" class=\"pure-menu-heading\">\n		<svg id=\"logo\"  width=\"200px\" height=\"44px\">\n	    <defs>\n	        <linearGradient x1=\"155.458682%\" y1=\"100%\" x2=\"0%\" y2=\"0%\" id=\"linearGradient-1\">\n	            <stop stop-color=\"#FBDA61\" offset=\"0%\"></stop>\n	            <stop stop-color=\"#F76B1C\" offset=\"100%\"></stop>\n	        </linearGradient>\n	    </defs>\n	    <text id=\"REGEX.JS\" fill=\"url(#linearGradient-1)\" font-family=\"Fira Sans\" font-size=\"48\" font-weight=\"bold\">\n	        <tspan x=\"0\" y=\"80%\">REGEX.JS</tspan>\n	    </text>\n		</svg>\n	</a>\n	<div class=\"pure-menu-subheading\">\n		Build and test regular expressions from the comfort of your browser!\n	</div>\n</div>\n";
  return buffer;
  });

this["Templates"]["test-list"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, helper;
  buffer += "\n		<ul class=\"stats unstyled inline\">\n			<li><strong>";
  if (helper = helpers.total) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.total); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " tests</strong></li>\n			";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.status), {hash:{},inverse:self.noop,fn:self.program(2, program2, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n		</ul>\n	";
  return buffer;
  }
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n			<li>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.success), {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " positive</li>\n			<li>";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.error), {hash:{},inverse:self.program(5, program5, data),fn:self.program(7, program7, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " negative</li>\n			";
  return buffer;
  }
function program3(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.success) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.success); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

function program5(depth0,data) {
  
  
  return "0";
  }

function program7(depth0,data) {
  
  var stack1, helper;
  if (helper = helpers.error) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.error); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  return escapeExpression(stack1);
  }

  buffer += "<header>\n	<form id=\"new-test\" class=\"pure-form pure-form-inline table-row\">\n		<div class=\"variable\">\n			<input type=\"text\" id=\"test-string\" placeholder=\"Enter a test string...\">\n		</div>\n		<div class=\"fixed\">\n			<button class=\"btn\">Add Test</button>\n		</div>\n	</form>\n	";
  stack1 = helpers['with'].call(depth0, (depth0 && depth0.stats), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</header>\n\n<ul id=\"test-list\" class=\"tests unstyled\"></ul>\n";
  return buffer;
  });

this["Templates"]["test"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); partials = this.merge(partials, Handlebars.partials); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "&nbsp;";
  }

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\n		<div class=\"matches\">\n			<strong class=\"pull-left\">Captures</strong>\n			<ol class=\"inline\">\n			";
  stack1 = helpers.each.call(depth0, (depth0 && depth0.match), {hash:{},inverse:self.noop,fn:self.program(4, program4, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n			</ol>\n		</div>\n	";
  return buffer;
  }
function program4(depth0,data) {
  
  var buffer = "";
  buffer += "\n				<li>"
    + escapeExpression((typeof depth0 === functionType ? depth0.apply(depth0) : depth0))
    + "</li>\n			";
  return buffer;
  }

  buffer += "<li class=\"test ";
  if (helper = helpers.status) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.status); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\">\n	";
  stack1 = self.invokePartial(partials.actions, 'actions', depth0, helpers, partials, data);
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	<div class=\"status\"></div>\n	";
  if (helper = helpers.stringFormat) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.stringFormat); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  stack1 = helpers.unless.call(depth0, (depth0 && depth0.string), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n	";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.match), {hash:{},inverse:self.noop,fn:self.program(3, program3, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\n</li>\n";
  return buffer;
  });