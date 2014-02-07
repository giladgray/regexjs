Backbone = require 'backbone'

class Expression extends Backbone.Model
	defaults:
		string: ''

class Expression.List extends Backbone.Collection
	model: Expression

module.exports = Expression
