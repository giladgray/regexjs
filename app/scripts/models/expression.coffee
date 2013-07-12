define ['backbone'], (Backbone) ->
	class Expression extends Backbone.Model
		defaults:
			string: ''

	class Expression.List extends Backbone.Collection
		model: Expression

	return Expression
