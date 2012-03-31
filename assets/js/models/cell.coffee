class GOL.Cell extends Backbone.Model
  defaults:
    filled: false
  toggleFilled: ->
    @set('filled', not @get('filled'))
